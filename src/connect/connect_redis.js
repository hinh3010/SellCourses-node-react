import { createClient } from 'redis';

// const redisClient = createClient(
// {
//     port: 6379,
//     host: '127.0.0.1'
// }
// )
const redisClient = createClient(6379, '127.0.0.1')
redisClient.connect()
redisClient.ping((err, pong) => console.log(pong))
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', function () {
    console.log('Redis::: connected!!');
});
redisClient.on('ping', function (err, pong) {
    console.log('Redis::: ping!!', pong);
});
redisClient.on('ready', function () {
    console.log('Redis::: ready!!');
});

export default redisClient
