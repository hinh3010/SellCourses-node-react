import express from 'express';
import controller from '../../controllers/index.controller.js';
import service from '../../services/index.service.js';
import '../../middleware/passport.mdw.js';
const passport = require("passport");


const {
    sigup, signIn, logout, refreshToken,
    signInPassportLocal, authGoogle
} = controller.user

const routeUser = express.Router({ mergeParams: true });

routeUser.post(
    '/register',
    sigup
)

routeUser.post(
    '/login',
    signIn
)

routeUser.post(
    '/login2',
    passport.authenticate('local', { session: false }),
    signInPassportLocal
)

routeUser
    .route('/auth/google')
    .post(
        passport.authenticate('google-plus-token', { session: false }),
        authGoogle
    )


routeUser.post(
    '/logout',
    logout
)

routeUser.post(
    '/refresh-token',
    refreshToken
)

routeUser.get(
    '/',
    // service.jwt.verifyAccessToken,                   // verify token
    passport.authenticate('jwt', { session: false }),   // verifi passport
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