import dotenv from 'dotenv'
dotenv.config()

const env = {
    port: process.env.PORT,
    database: {
        connection_mongodb: process.env.MONGODB_URL,
    },
    jwt: {
        access_token_serret: 'HelloCacBanTre',
        access_expiresIn: '20s',
        refresh_token_serret: 'BatNgoChuaBaGia',
        refresh_expiresIn: '1h',
    }

}

export default env