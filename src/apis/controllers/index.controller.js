
import authController from './auth.controller.js';
import courseController from './course.controller.js';
import lessonController from './lesson.controller.js';
import userController from './user.controller.js';
const controller = {
    auth: authController,
    user: userController,
    course: courseController,
    lesson: lessonController,
}

export default controller