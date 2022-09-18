import express from 'express';
import createError from 'http-errors';
import User from '../../models/user.model';
import service from '../../services/index.service.js';
import validate from '../../validations/index.validation.js'
const routeUser = express.Router({ mergeParams: true });

const {
    verifyAccessToken, signRefreshToken,
    verifyRefreshToken, signAccessToken
} = service.jwt

const { login, register } = validate.user

routeUser.post(
    '/register',
    async (req, res, next) => {
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
)


routeUser.post(
    '/login',
    async (req, res, next) => {
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
)


routeUser.post(
    '/logout',
    async (req, res, next) => {
        try {
            console.log(req.body)
        } catch (error) {
            next(error);
        }
    }
)


routeUser.post(
    '/refresh-token',
    async (req, res, next) => {
        try {
            if (!req.body.refreshToken) throw createError.BadRequest()
            const { userId } = await verifyRefreshToken(req.body.refreshToken)
            const token = await signAccessToken(userId)
            const refreshToken = await signRefreshToken(userId)
            return res.json({
                token, refreshToken
            })
        } catch (error) {
            next(error);
        }
    }
)

routeUser.get(
    '/',
    verifyAccessToken,
    async (req, res, next) => {
        const listUser = [
            { id: 'as', name: 'adu' },
            { id: 'as', name: 'adu' },
            { id: 'as', name: 'adu' },
        ]
        res.json({
            status: 200,
            data: listUser
        })
    }
)

export default routeUser