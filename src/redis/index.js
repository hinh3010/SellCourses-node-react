import { redisClient } from "../app";

const PROJECT_NAME = process.env.PROJECT_NAME || 'ALO389';
const NODE_ENV = process.env.NODE_ENV || 'developer';
const DEFAULT_EXPIRE = 300; //5 minutes

const setJsonWithExpire = async (key, value, expire = DEFAULT_EXPIRE) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    return redisClient.set(redisKey, JSON.stringify(value), 'ex', expire);
};

const setWithExpire = async (key, value, expire = DEFAULT_EXPIRE) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    return redisClient.set(redisKey, value, 'ex', expire);
};

const setJsonNoExpire = async (key, value) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    return redisClient.set(redisKey, JSON.stringify(value));
};

const setNoExpire = async (key, value) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    return redisClient.set(redisKey, value);
};

const getJson = async (key) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    const data = await redisClient.get(redisKey);
    return JSON.parse(data);
};

const get = async (key) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    return redisClient.get(redisKey);
};

const del = async (key) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    return redisClient.del(redisKey)
};

// Key: sample_pattern:*
const deleteMultipKey = async (key) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    redisClient.keys(redisKey).then((keys) => {
        const pipeline = redisClient.pipeline();
        keys.forEach(function (key) {
            pipeline.del(key);
        });
        return pipeline.exec();
    })
}

const increment = async (key, incre = 1) => {
    const redisKey = PROJECT_NAME + '_' + NODE_ENV + '_' + key;
    return redisClient.incrby(redisKey, incre)
}

export const redis = {
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


const Redis = require('ioredis');
export const redisClient = new Redis();