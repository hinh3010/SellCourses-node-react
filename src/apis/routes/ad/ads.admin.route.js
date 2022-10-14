import express from 'express';
import controller from '../../controllers/index.controller.js';
import mdw from '../../middleware/index.mdw.js';
import '../../middleware/passport.mdw.js';
const passport = require("passport");


const { validateBody, validateParam, schemaValidator } = mdw

const {
    getAll, create,
    getById, updateById,
    softDeleteById,
    deletedById, undoById
} = controller.ads

const routeAds = express.Router({ mergeParams: true });



routeAds.route('/')
    .get(
        getAll
    )
    .post(
        create
    )

routeAds.route('/:adsId')
    .get(
        getById
    )
    .patch(
        updateById
    )
    .delete(
        softDeleteById
    )

routeAds.route('/delete/:adsId')
    .delete(
        deletedById
    )

routeAds.route('/undo/:adsId')
    .patch(
        undoById
    )
export default routeAds