import express from 'express';
import controller from '../../controllers/index.controller.js';
import mdw from '../../middleware/index.mdw.js';
import '../../middleware/passport.mdw.js';
const passport = require("passport");


const {
    sigup, signIn, logout, refreshToken,
    signInPassportLocal, authGoogle, authFacebook
} = controller.auth

const { validateBody, validateParam, schemaValidator } = mdw

const routeAuth = express.Router({ mergeParams: true });

routeAuth.post(
    '/register',
    validateBody(schemaValidator.register),
    sigup
)

routeAuth.post(
    '/logout',
    logout
)

routeAuth.post(
    '/login',
    validateBody(schemaValidator.login),
    passport.authenticate('local', { session: false }),
    signIn
)

routeAuth.post(
    '/refreshToken',
    validateBody(schemaValidator.refreshToken),
    refreshToken
)

routeAuth
    .route('/login/google')
    .post(
        passport.authenticate('google-plus-token', { session: false }),
        authGoogle
    )

routeAuth
    .route('/login/facebook')
    .post(
        passport.authenticate('facebook-token', { session: false }),
        authFacebook
    )




// test
routeAuth.get(
    '/testToken',
    // service.jwt.verifyAccessToken,                   // verify token
    passport.authenticate('jwt', { session: false }),   // verifi passport
    async (req, res, next) => {
        res.json({
            status: 200,
            data: [
                { id: 'as', name: 'adu' },
                { id: 'as', name: 'adu' },
                { id: 'as', name: 'adu' },
            ]
        })
    }
)

export default routeAuth