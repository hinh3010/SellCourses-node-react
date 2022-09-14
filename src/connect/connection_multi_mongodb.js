import mongoose from "mongoose";

function newConnection(uri) {
    const mongodb = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongodb.on('connected', function () {
        console.log(`MongoDb::: connected ${this.name}!!`)
    })
    mongodb.on('disconnected', function () {
        console.log(`MongoDb::: disconnected ${this.name}!!`)
    })
    mongodb.on('error', function (err) {
        console.log(`MongoDB::: Failed to connect ${this.name}!! `, err.message)
    })

    return mongodb
}

const testConnection = newConnection('env.database.connection_mongodb.test1')
const test2Connection = newConnection('env.database.connection_mongodb.test2')

process.on('SIGINT', async () => {
    await mongodb.close()
    process.exit(0)
})

const multiConnection = {
    testConnection: testConnection,
    test2Connection: test2Connection,
}

export default multiConnection