import { createClient } from 'redis';
import Logger from '../logger/index.js';


const log = new Logger(__filename)
const redisClient = createClient(6379, '127.0.0.1')

redisClient.on('error', (err) => {
    console.log('Redis Client Error', err.message)
    throw err
});

redisClient.on('connect', function () {
    console.log('Redis::: connected!!');
});

redisClient.on('ready', function () {
    console.log('Redis::: ready!!');
});

export const redisDbConnect = async () => {
    try {
        await redisClient.connect()
    } catch (error) {
        log.error(`Redis::: Failed to connect!! - ${error.message}`)
        throw new Error(`Redis::: Failed to connect!!`)
    }
}

export default redisClient
