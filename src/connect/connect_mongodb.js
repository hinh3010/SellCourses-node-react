import mongoose from "mongoose";
import env from "../env";
import Logger from '../logger/index.js';

const log = new Logger(__filename)

const mongooseDbConnect = async () => {
    try {
        await mongoose.connect(env.database.connection_mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true
        })
        console.log('MongoDb::: connected!!')
    } catch (error) {
        log.error(`MongoDB::: Failed to connect!! - ${error.message}`)
        throw new Error(`MongoDB::: Failed to connect!!`)
    }
}

export default mongooseDbConnect
