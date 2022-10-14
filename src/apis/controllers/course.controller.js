import createError from 'http-errors';
import catchAsync from '../utils/catch-async';
import pick from '../utils/pick';
import CourseModel from './../models/course.model';

const isMentor = (courseId, userId) => { return courseId.toString() === userId.toString() }

const getAll = catchAsync(async (req, res) => {

    const filters = pick(req.query, ['status', 'cmsStatus', 'createdById']);
    const options = pick(req.query, ['sort', 'limit', 'page']);

    const courseList = await CourseModel.paginate(
        {
            ...filters, deletedById: { $exists: false },
        },
        {
            ...options, select: '-password -token -refreshToken',
        }
    )

    return res.json({
        status: 200,
        data: courseList
    })
})

const create = catchAsync(async (req, res) => {

    const course = new CourseModel({ ...req.body, createdById: req.user._id })
    const newCourse = await course.save()

    return res.json({
        status: 200,
        data: newCourse
    })
})


const getById = catchAsync(async (req, res) => {

    const courseId = req.params.courseId

    const course = await CourseModel.findOne(
        {
            _id: courseId,
            deletedById: { $exists: false },
        }
    )

    if (!course) {
        throw createError.NotFound(`CourseModel ${courseId} not found`)
    }
    return res.json({
        status: 200,
        data: course
    })
})

const updateById = catchAsync(async (req, res) => {

    const { courseId } = pick(req.params, ['courseId']);
    // const courseId = req.params.courseId

    const body = req.body

    const courseById = await CourseModel.findOne(
        {
            _id: courseId,
            deletedById: { $exists: false },
        }
    )
    if (!courseById) throw createError.NotFound(`CourseModel ${courseId} not found`)

    if (!isMentor(courseById.createdById, req.user._id)) {
        throw createError.Forbidden(`You can't update this course.`)
    }

    const course = await CourseModel.findOneAndUpdate(
        {
            _id: courseId,
        },
        body,
        {
            new: true,
        }
    );


    return res.json({
        status: 200,
        data: course
    })
})


const changeStatusById = catchAsync(async (req, res) => {

    const { courseId } = pick(req.params, ['courseId']);

    const course = await CourseModel.findOne({
        _id: courseId,
        deletedById: { $exists: false },
    });
    if (!course) throw createError.NotFound(`CourseModel ${courseId} not found`)

    const cmsStatus = req.body.cmsStatus
    if (course.cmsStatus === cmsStatus) {
        throw createError.BadRequest('Account status is not same as old status')
    }

    course.cmsStatus = cmsStatus
    course.cmsContentReport = cmsStatus === 'ACTIVE' ? null : req.body.cmsContentReport
    course.changeCmsStatusById = req.user._id
    course.save()

    return res.json({
        status: 200,
        data: course
    })
})



const deleteById = catchAsync(async (req, res) => {

    const { courseId } = pick(req.params, ['courseId']);

    const course = await CourseModel.findOne({
        _id: courseId,
        deletedById: { $exists: false },
    });

    if (!course || (course.status === 'ACTIVE' && course.cmsStatus === 'ACTIVE'))
        throw createError.NotFound(`CourseModel ${courseId} not found`)

    if (!isMentor(course.createdById, req.user._id)) {
        throw createError.Forbidden(`You can't update this course.`)
    }

    // await CourseModel.deleteOne({ _id: courseId })
    course.deletedById = req.user._id;
    course.deletedAt = new Date();
    course.save()

    return res.json({
        status: 200,
        data: course
    })
})


export default {
    getAll, create,
    getById, updateById,
    changeStatusById, deleteById,
}