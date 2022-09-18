import jwt from 'jsonwebtoken'
import env from './../../env/index.js';
import createError from 'http-errors';

const {
    access_token_serret, access_expiresIn,
    refresh_token_serret, refresh_expiresIn,
} = env.jwt

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const serret = access_token_serret
        const options = {
            expiresIn: access_expiresIn
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
    jwt.verify(token, access_token_serret, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))
        }
        req.payload = payload
        next()
    })
}


const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }
        const serret = refresh_token_serret
        const options = {
            expiresIn: refresh_expiresIn
        }
        jwt.sign(payload, serret, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        if (!refreshToken) {
            return next(createError.BadRequest())
        }
        jwt.verify(refreshToken, refresh_token_serret, (err, payload) => {
            if (err) reject(err)
            resolve(payload)
        })
    })
}

export default {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}