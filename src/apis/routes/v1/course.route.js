import express from 'express';
import controller from '../../controllers/index.controller.js';
import mdw from '../../middleware/index.mdw.js';
import '../../middleware/passport.mdw.js';
const passport = require("passport");


const { validateBody, validateParam, schemaValidator } = mdw

const {
    getAll
} = controller.course

const routeCourse = express.Router({ mergeParams: true });



routeCourse.route('/')
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

routeCourse.route('/:courseId')
    .get(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            res.json({
                message: 'get one'
            })
        }
    )
    .patch(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            res.json({
                message: "updatedById"
            })
        }
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        (req, res) => {
            res.json({
                message: "delete",
            })
        }
    )


export default routeCourse