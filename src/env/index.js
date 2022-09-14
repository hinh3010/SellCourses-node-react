import dotenv from 'dotenv'
dotenv.config()

const env = {
    port: process.env.PORT,
    database: {
        connection_mongodb: process.env.MONGODB_URL,
    },
}

export default env