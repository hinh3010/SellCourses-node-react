import express from 'express';
import routeAuth from "./auth.route.js";

let routeV1 = express.Router();

routeV1.use('/auth', routeAuth)

export default routeV1;