import createError from 'http-errors';
import service from '../services/index.service.js';
import validate from '../validations/index.validation.js'
import User from '../models/user.model.js';
import redis from '../../redis/index.js';

const {
    verifyAccessToken, signRefreshToken,
    verifyRefreshToken, signAccessToken
} = service.jwt
const { login, register } = validate.user

const sigup = async (req, res, next) => {
    try {
        const { error } = register(req.body)
        if (error) {
            throw createError(error.details[0].message)
        }
        const { displayName, email, password } = req.body
        if (!email || !password || !displayName) {
            throw createError.BadRequest()
        }
        const isConflict = await User.findOne({ email: email })
        if (isConflict) {
            throw createError.Conflict(`${email} is already`)
        }
        // const newUser = await User.create({
        //     email: email,
        //     displayName: displayName,
        //     password: password
        // })
        const user = new User({
            email: email,
            displayName: displayName,
            password: password
        })
        const newUser = await user.save()
        return res.json({
            status: 200,
            data: newUser
        })
    } catch (error) {
        next(error);
    }
}

const sign = async (req, res, next) => {
    try {
        const { error } = login(req.body)
        if (error) {
            throw createError(error.details[0].message)
        }
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw createError.NotFound('User not registed')
        }
        const isValidPassword = await user.isCheckPassword(password)
        if (!isValidPassword) {
            throw createError.Unauthorized()
        }

        const token = await signAccessToken(user._id)
        const refreshToken = await signRefreshToken(user._id)
        return res.json({
            status: 200,
            data: {
                token,
                refreshToken,
                user
            }
        })
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        if (!req.body.refreshToken) throw createError.BadRequest()
        const { userId } = await verifyRefreshToken(req.body.refreshToken)
        if (userId) {
            const isDelete = await redis.del(userId)
            if (!isDelete) {
                throw createError.InternalServerError()
            }
            return res.json({
                status: 200,
                data: userId
            })
        }
        throw createError.BadRequest()
    } catch (error) {
        next(error);
    }
}

const refreshToken = async (req, res, next) => {
    try {
        if (!req.body.refreshToken) throw createError.BadRequest()
        const { userId } = await verifyRefreshToken(req.body.refreshToken)
        if (userId) {
            const token = await signAccessToken(userId)
            const refreshToken = await signRefreshToken(userId)
            return res.json({
                status: 200,
                data: {
                    token, refreshToken
                }
            })
        }
        throw createError.BadRequest()
    } catch (error) {
        next(error);
    }
}

export default {
    sigup, sign, logout, refreshToken
}