import express from 'express';
import routeAuth from "./auth.route.js";
import routeCourse from './course.route.js';
import routeLesson from './lesson.route.js';
import routeUser from './user.route.js';

let routeV1 = express.Router();

routeV1.use('/auth', routeAuth)
routeV1.use('/users', routeUser)
routeV1.use('/courses', routeCourse)
routeV1.use('/lessons', routeLesson)


export default routeV1;