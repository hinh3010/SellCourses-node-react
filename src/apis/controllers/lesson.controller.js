import createError from 'http-errors';
import catchAsync from '../utils/catch-async';
import pick from '../utils/pick';
import LessonModel from '../models/lesson.model';
import CourseModel from '../models/course.model';

const isMentor = (lessonId, userId) => { return lessonId.toString() === userId.toString() }

const getAll = catchAsync(async (req, res) => {

    const filters = pick(req.query, ['status', 'cmsStatus', 'createdById']);
    const options = pick({ ...req.query, sort: 'position' }, ['sort', 'limit', 'page']);

    const lessonList = await LessonModel.paginate(
        {
            ...filters, deletedById: { $exists: false },
        },
        {
            ...options, select: '-password -token -refreshToken',
        }
    )

    return res.json({
        status: 200,
        data: lessonList
    })
})

const create = catchAsync(async (req, res) => {

    const course = await CourseModel.findOne({
        _id: req.body.courseId,
        deletedById: { $exists: false },
    });
    if (!course)
        throw createError.NotFound(`CourseModel ${courseId} not found`)

    if (!isMentor(course.createdById, req.user._id)) {
        throw createError.Forbidden(`You can't create lesson for this course.`)
    }

    const previousLesson = await LessonModel.findOne({
        courseId: req.body.courseId,
        deletedById: { $exists: false },
    }).sort({ position: -1 });

    if (!req.body.position)
        req.body.position = previousLesson && previousLesson.position && typeof previousLesson.position === 'number' ? previousLesson.position + 1 : 1

    const lesson = new LessonModel({ ...req.body, createdById: req.user._id })
    const newCourse = await lesson.save()

    return res.json({
        status: 200,
        data: newCourse
    })
})


const getById = catchAsync(async (req, res) => {

    const lessonId = req.params.lessonId

    const lesson = await LessonModel.findOne(
        {
            _id: lessonId,
            deletedById: { $exists: false },
        }
    )

    if (!lesson) {
        throw createError.NotFound(`LessonModel ${lessonId} not found`)
    }
    return res.json({
        status: 200,
        data: lesson
    })
})

const updateById = catchAsync(async (req, res) => {

    const { lessonId } = pick(req.params, ['lessonId']);
    // const lessonId = req.params.lessonId

    const body = req.body

    const lessonById = await LessonModel.findOne(
        {
            _id: lessonId,
            deletedById: { $exists: false },
        }
    )
    if (!lessonById) throw createError.NotFound(`LessonModel ${lessonId} not found`)

    if (!isMentor(lessonById.createdById, req.user._id)) {
        throw createError.Forbidden(`You can't update this lesson.`)
    }

    const lesson = await LessonModel.findOneAndUpdate(
        {
            _id: lessonId,
        },
        body,
        {
            new: true,
        }
    );


    return res.json({
        status: 200,
        data: lesson
    })
})


const changeStatusById = catchAsync(async (req, res) => {

    const { lessonId } = pick(req.params, ['lessonId']);

    const lesson = await LessonModel.findOne({
        _id: lessonId,
        deletedById: { $exists: false },
    });
    if (!lesson) throw createError.NotFound(`LessonModel ${lessonId} not found`)

    const cmsStatus = req.body.cmsStatus
    if (lesson.cmsStatus === cmsStatus) {
        throw createError.BadRequest('Account status is not same as old status')
    }

    lesson.cmsStatus = cmsStatus
    lesson.cmsContentReport = cmsStatus === 'ACTIVE' ? null : req.body.cmsContentReport
    lesson.changeCmsStatusById = req.user._id
    lesson.save()

    return res.json({
        status: 200,
        data: lesson
    })
})



const deleteById = catchAsync(async (req, res) => {

    const { lessonId } = pick(req.params, ['lessonId']);

    const lesson = await LessonModel.findOne({
        _id: lessonId,
        deletedById: { $exists: false },
    });

    if (!lesson || (lesson.status === 'ACTIVE' && lesson.cmsStatus === 'ACTIVE'))
        throw createError.NotFound(`LessonModel ${lessonId} not found`)

    if (!isMentor(lesson.createdById, req.user._id)) {
        throw createError.Forbidden(`You can't update this lesson.`)
    }

    // await LessonModel.deleteOne({ _id: lessonId })
    lesson.deletedById = req.user._id;
    lesson.deletedAt = new Date();
    lesson.save()

    return res.json({
        status: 200,
        data: lesson
    })
})


export default {
    getAll, create,
    getById, updateById,
    changeStatusById, deleteById,
}