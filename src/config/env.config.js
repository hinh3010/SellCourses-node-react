import dotenv from 'dotenv'
dotenv.config()

const access_expires = process.env.ACCESS_TOKEN_EXPIRES || 50
const refresh_expires = process.env.REFRESH_TOKEN_EXPIRES || 5000
const project_name = process.env.PROJECT_NAME || 'SellCourses'
const node_env = process.env.NODE_ENV || 'development'

console.log("db:::", process.env.MONGODB_URL)
const env = {
    port: process.env.PORT,
    project_name: project_name,
    node_env: node_env,
    database: {
        connection_mongodb: process.env.MONGODB_URL,
    },
    jwt: {
        access_token_serret: 'HelloCacBanTre',
        access_expiresIn: access_expires.toString() + 'd',
        access_expires: Number(access_expires),
        refresh_token_serret: 'BatNgoChuaBaGia',
        refresh_expiresIn: refresh_expires.toString() + 'd',
        refresh_expires: Number(refresh_expires)
    },
    auth: {
        google: {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || ''
        },
        facebook: {
            CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || '',
            CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || '',
        }
    }

}

export default env