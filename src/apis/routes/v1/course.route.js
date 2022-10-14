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
} = controller.course

const routeCourse = express.Router({ mergeParams: true });



routeCourse.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        getAll
    )
    .post(
        passport.authenticate('jwt', { session: false }),
        create
    )

routeCourse.route('/:courseId')
    .get(
        passport.authenticate('jwt', { session: false }),
        getById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        updateById
    )

routeCourse.route('/admin/:courseId')
    .delete(
        passport.authenticate('jwt', { session: false }),
        deleteById
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        changeStatusById
    )

export default routeCourse