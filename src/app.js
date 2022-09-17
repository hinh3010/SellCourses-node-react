import express from 'express'
import createError from 'http-errors'
import routeV1 from './apis/routes/v1/index.route.js'
import env from './env/index.js'
import appLoader from './loader/app.loader.js'
import './connect/connect_mongodb.js'
import redisClient from './connect/connect_redis.js'


const app = express()
appLoader(app)
redisClient.set('framework', 'ReactJS', function (err, reply) {
    console.log(reply); // OK
});
redisClient.get('framework', function (err, reply) {
    console.log(reply); // ReactJS
});
app.get('/', async (req, res) => {
    const setKey = await redisClient.set('token', 'con me no')
    console.log({ setKey })
    const getKey = await redisClient.get('token')
    console.log({ getKey })
    res.json({ result: getKey })
})

app.use('/v1', routeV1)
app.use((req, res, next) => {
    next(createError.NotFound('Loi roi !'))
})
app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

const PORT = env.port || 8081
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
})