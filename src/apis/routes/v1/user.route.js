import express from 'express';
import createError from 'http-errors';
import User from '../../models/user.model';
import validate from '../../validations/index.validation.js'
const routeUser = express.Router({ mergeParams: true });

routeUser.post(
    '/register',
    async (req, res, next) => {
        try {
            const { error } = validate.user.register(req.body)
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
            const { error } = validate.user.login(req.body)
            if (error) {
                throw createError(error.details[0].message)
            }
            const { email, password } = req.body
            const user = await User.findOne({ email: email })
            if (!user) {
                throw createError.NotFound('User not registed')
            }
            const isValidPassword = await user.isCheckPassword(password)
            if (!isValidPassword) {
                throw createError.Unauthorized()
            }

            return res.json({
                status: 200,
                data: user
            })
        } catch (error) {
            next(error);
        }
    }
)


routeUser.post(
    '/logout',
    async (req, res, next) => {
        res.send()
    }
)


routeUser.post(
    '/refresh-token',
    async (req, res, next) => {
        res.send()
    }
)

export default routeUser