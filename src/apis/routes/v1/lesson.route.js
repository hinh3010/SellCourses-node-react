import express from 'express';
import controller from '../../controllers/index.controller.js';
import mdw from '../../middleware/index.mdw.js';
import '../../middleware/passport.mdw.js';
const passport = require("passport");


const { validateBody, validateParam, schemaValidator } = mdw

const {
    getAll, create,
    getById, updateById,
    changeStatusById, deleteById,
} = controller.lesson

const routeLesson = express.Router({ mergeParams: true });



routeLesson.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        getAll
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        create
    )

routeLesson.route('/:lessonId')
    .get(
        passport.authenticate('jwt', { session: false }),
        getById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        updateById
    )

routeLesson.route('/admin/:lessonId')
    .delete(
        passport.authenticate('jwt', { session: false }),
        deleteById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        changeStatusById
    )

export default routeLesson