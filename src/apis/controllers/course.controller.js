import createError from 'http-errors';
import catchAsync from '../utils/catch-async';
import CourseModel from './../models/course.model';


const getAll = catchAsync(async (req, res) => {
    const { user } = req
    console.log({ user })

    // const token = await signAccessToken(user._id)
    // const refreshToken = await signRefreshToken(user._id)

    // const { password, ...restOfUser } = user._doc

    // return res.json({
    //     status: 200,
    //     data: {
    //         token,
    //         refreshToken,
    //         user: restOfUser
    //     }
    // })
})




export default {
    getAll
}