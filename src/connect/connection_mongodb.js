import mongoose from "mongoose";
import env from "../config/env.config";

const connectMongodb = mongoose.createConnection(env.database.connection_mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

connectMongodb.on('connected', () => {
    console.log('MongoDb::: connected!!')
})
connectMongodb.on('disconnected', () => {
    console.log('MongoDb::: disconnected!!')
})
connectMongodb.on('error', (err) => {
    console.log('MongoDB::: Failed to connect!! ', err.message)
})

process.on('SIGINT', async () => {
    await connectMongodb.close()
    process.exit(0)
})

export default connectMongodb