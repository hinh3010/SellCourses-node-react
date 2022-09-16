import jwt from 'jsonwebtoken'
import env from './../../env/index.js';
import createError from 'http-errors';

const accessSerret = env.jwt.access_token_serret
const accessExpires = env.jwt.access_expiresIn
const refreshSerret = env.jwt.refresh_token_serret
const refreshExpires = env.jwt.refresh_expiresIn

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const serret = accessSerret
        const options = {
            expiresIn: accessExpires
        }
        jwt.sign(payload, serret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }
    const authorization = req.headers['authorization']
    const token = authorization.split(' ')[1]
    if (!token) {
        return next(createError.Unauthorized())
    }
    jwt.verify(token, accessSerret, (err, payload) => {
        if (err) {
            return next(createError.Unauthorized())
        }
        console.log(payload)
        req.payload = payload
        next()
    })
}


const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const serret = refreshSerret
        const options = {
            expiresIn: refreshExpires
        }
        jwt.sign(payload, serret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}


export default {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken
}