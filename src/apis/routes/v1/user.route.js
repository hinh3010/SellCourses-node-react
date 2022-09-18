import express from 'express';
import controller from '../../controllers/index.controller.js';
import service from '../../services/index.service.js';

const { sigup, sign, logout, refreshToken } = controller.user

const routeUser = express.Router({ mergeParams: true });

routeUser.post(
    '/register',
    sigup
)

routeUser.post(
    '/login',
    sign
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
    service.jwt.verifyAccessToken,
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