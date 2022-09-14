import express from 'express'
import createError from 'http-errors'
import routeV1 from './apis/routes/v1/index.route.js'
import env from './env/index.js'
import './connect/connect_mongodb.js'
import appLoader from './loader/app.loader.js'


const app = express()

appLoader(app)

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