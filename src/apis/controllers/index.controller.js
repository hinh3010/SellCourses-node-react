
import authController from './auth.controller.js';
import courseController from './course.controller.js';
import userController from './user.controller.js';
const controller = {
    auth: authController,
    user: userController,
    course: courseController
}

export default controller