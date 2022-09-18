import { createClient } from 'redis';

const redisClient = createClient(6379, '127.0.0.1')

redisClient.connect()

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err)
    throw err
});

redisClient.on('connect', function () {
    console.log('Redis::: connected!!');
});

redisClient.on('ready', function () {
    console.log('Redis::: ready!!');
});

export default redisClient
