import express from 'express';
import routeAuth from "./auth.route.js";
import routeCourse from './course.route.js';
import routeUser from './user.route.js';

let routeV1 = express.Router();

routeV1.use('/auth', routeAuth)
routeV1.use('/courses', routeCourse)
routeV1.use('/users', routeUser)

export default routeV1;