import express from 'express'
import routeV1 from './apis/routes/v1/index.route.js'
import mongooseDbConnect from './connect/connect_mongodb.js'
import redisClient, { redisDbConnect } from './connect/connect_redis.js'
import env from './env/index.js'
import appLoader from './loader/app.loader.js'


const app = express()
appLoader(app)
mongooseDbConnect()
redisDbConnect()


app.get('/', async (req, res) => {
    const setKey = await redisClient.set('token', 'con me no', {
        EX: 10,
        NX: true
    })
    const getKey = await redisClient.get('token')
    res.json({
        setStatus: setKey,
        result: getKey,
    })
})


app.use('/v1', routeV1)
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