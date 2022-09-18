import dotenv from 'dotenv'
dotenv.config()

const access_expires = process.env.ACCESS_TOKEN_EXPIRES
const refresh_expires = process.env.REFRESH_TOKEN_EXPIRES
const project_name = process.env.PROJECT_NAME || 'SellCourses'
const node_env = process.env.NODE_ENV || 'development'

const env = {
    port: process.env.PORT,
    project_name: project_name,
    node_env: node_env,
    database: {
        connection_mongodb: process.env.MONGODB_URL,
    },
    jwt: {
        access_token_serret: 'HelloCacBanTre',
        access_expiresIn: access_expires.toString() + 's',
        access_expires,
        refresh_token_serret: 'BatNgoChuaBaGia',
        refresh_expiresIn: refresh_expires.toString() + 's',
        refresh_expires
    }

}

export default env