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

const routeCourse = express.Router({ mergeParams: true });



routeCourse.route('/')
    .get(
        (req, res) => {
            res.json({
                message: 'get all'
            })
        }
    )
    .post(
        (req, res) => {
            res.json({
                message: 'createed'
            })
        }
    )

routeCourse.route('/:courseId')
    .get(
        (req, res) => {
            res.json({
                message: 'get one'
            })
        }
    )
    .patch(
        (req, res) => {
            res.json({
                message: "updatedById"
            })
        }
    )
    .delete(
        (req, res) => {
            res.json({
                message: "delete",
            })
        }
    )


export default routeCourse