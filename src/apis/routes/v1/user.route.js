import express from 'express';
import controller from '../../controllers/index.controller.js';
import mdw from '../../middleware/index.mdw.js';
import '../../middleware/passport.mdw.js';
const passport = require("passport");


const { validateBody, validateParam, schemaValidator } = mdw

const {
    getAll,
    getById, updateById, changeStatusById,
    deleteById,
} = controller.user

const routeUser = express.Router({ mergeParams: true });



routeUser.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        getAll
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            res.json({
                message: 'createed'
            })
        }
    )

routeUser.route('/:userId')
    .get(
        passport.authenticate('jwt', { session: false }),
        getById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        updateById
    )


routeUser.route('/admin/:userId')
    .delete(
        passport.authenticate('jwt', { session: false }),
        deleteById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        changeStatusById
    )

export default routeUser