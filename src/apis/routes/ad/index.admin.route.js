import express from 'express';
import routeAds from './ads.admin.route.js';
const passport = require("passport");

let routeAd = express.Router();

routeAd.use('/ads', passport.authenticate('jwt', { session: false }), routeAds)


export default routeAd;