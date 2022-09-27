import env from '../config/env.config.js';
import redisClient from '../connect/connect_redis.js';

const { project_name, node_env } = env
const default_expire = 300; //5 minutes

const formatKey = (key) => {
    let _key = key
    if (typeof key !== 'string') {
        _key.toString()
    }
    return project_name + '_' + node_env + '_' + _key;
}

const setJsonWithExpire = async (key, value, expire = default_expire) => {
    const redisKey = formatKey(key)
    return redisClient.set(redisKey, JSON.stringify(value), {
        EX: expire,
        NX: true
    });
};

const setWithExpire = async (key, value, expire = default_expire) => {
    const redisKey = formatKey(key)
    return redisClient.set(redisKey, value, {
        EX: expire,
        // NX: true
    });
};

const setJsonNoExpire = async (key, value) => {
    const redisKey = formatKey(key)
    return redisClient.set(redisKey, JSON.stringify(value));
};

const setNoExpire = async (key, value) => {
    const redisKey = formatKey(key)
    return redisClient.set(redisKey, value);
};

const getJson = async (key) => {
    const redisKey = formatKey(key)
    const data = await redisClient.get(redisKey);
    return JSON.parse(data);
};

const get = async (key) => {
    const redisKey = formatKey(key)
    return redisClient.get(redisKey);
};

const del = async (key) => {
    const redisKey = formatKey(key)
    return redisClient.del(redisKey)
};

// Key: sample_pattern:*
const deleteMultipKey = async (key) => {
    const redisKey = formatKey(key)
    redisClient.keys(redisKey).then((keys) => {
        const pipeline = redisClient.pipeline();
        keys.forEach(function (key) {
            pipeline.del(key);
        });
        return pipeline.exec();
    })
}

const increment = async (key, incre = 1) => {
    const redisKey = formatKey(key)
    return redisClient.incrby(redisKey, incre)
}

const redis = {
    setJsonWithExpire,
    setWithExpire,
    setJsonNoExpire,
    setNoExpire,
    getJson,
    get,
    del,
    deleteMultipKey,
    increment,
};

export default redis