import express from 'express';
import routeUser from "./user.route.js";

let routeV1 = express.Router();

routeV1.use('/user', routeUser)

export default routeV1;