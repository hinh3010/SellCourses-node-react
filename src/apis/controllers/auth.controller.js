import createError from 'http-errors';
import redis from '../../redis/index.js';
import User from '../models/User.model.js';
import service from '../services/index.service.js';
import catchAsync from '../utils/catch-async.js';
const {
    verifyAccessToken, signRefreshToken,
    verifyRefreshToken, signAccessToken
} = service.jwt

const sigup = async (req, res, next) => {
    try {
        const {
            email, password, accountType,
            firstName, lastName, phone, displayName, ...data
        } = req.body

        const isConflict = await User.findOne({ email: email })
        if (isConflict) {
            throw createError.Conflict(`${email} is already`)
        }

        const user = new User({
            email, password, accountType,
            firstName, lastName, phone,
            displayName: displayName ? displayName : `${firstName} ${lastName}`,
            ...data
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

const signIn = catchAsync(async (req, res) => {
    const { user } = req

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
})



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


const authGoogle = async (req, res, next) => {
    // Assign a token
    const user = req.user
    const token = await signAccessToken(user._id)
    const refreshToken = await signRefreshToken(user._id)

    // res.setHeader('Authorization', token)
    // console.log({ token, refreshToken })
    return res.json({
        status: 200,
        data: {
            token,
            refreshToken,
            user
        }
    })
}

const authFacebook = async (req, res, next) => {
    // Assign a token
    const user = req.user
    const token = await signAccessToken(user._id)
    const refreshToken = await signRefreshToken(user._id)

    // res.setHeader('Authorization', token)
    // console.log({ token, refreshToken })
    return res.json({
        status: 200,
        data: {
            token,
            refreshToken,
            user
        }
    })
}

export default {
    sigup, signIn, logout, refreshToken,
    authGoogle, authFacebook
}