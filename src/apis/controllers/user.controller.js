import createError from 'http-errors';
import catchAsync from '../utils/catch-async';
import pick from '../utils/pick';
import User from '../models/User.model.js';
import bcrypt from 'bcrypt';



const getAll = catchAsync(async (req, res) => {

    const query = { ...req.query, isSuperAdmin: false }
    const filters = pick(query, ['accountType', 'accountStatus', 'isAdmin']);
    const options = pick(query, ['sort', 'limit', 'page']);

    const userList = await User.paginate(
        {
            ...filters, deletedById: { $exists: false },
        },
        {
            ...options, select: '-password -token -refreshToken',
        }
    )

    return res.json({
        status: 200,
        data: userList
    })
})

const getById = catchAsync(async (req, res) => {

    const userId = req.params.userId

    const user = await User.findOne(
        {
            _id: userId,
            deletedById: { $exists: false },
        },
        {
            password: 0,
            token: 0,
            refreshToken: 0,
        }
    )

    if (!user) {
        throw createError.NotFound(`User ${userId} not found`)
    }
    return res.json({
        status: 200,
        data: user
    })
})

const updateById = catchAsync(async (req, res) => {

    const { userId } = pick(req.params, ['userId']);

    // const userId = req.params.userId

    const isUser = await User.findById(userId)
    if (!isUser) throw createError.NotFound(`User ${userId} not found`)

    const body = req.body

    if (body.password) {
        const hashPassword = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
        body.password = hashPassword
    }

    const user = await User.findOneAndUpdate(
        {
            _id: userId,
        },
        body,
        {
            new: true,
        }
    );

    if (user.password)
        delete user.password
    return res.json({
        status: 200,
        data: user
    })
})


const changeStatusById = catchAsync(async (req, res) => {

    const { userId } = pick(req.params, ['userId']);

    const user = await User.findOne({
        _id: userId,
        deletedById: { $exists: false },
    });
    if (!user) throw createError.NotFound(`User ${userId} not found`)

    if (user.accountStatus === req.body.accountStatus) {
        throw createError.BadRequest('Account status is not same as old status')
    }

    user.accountStatus = req.body.accountStatus
    user.changeStatusById = req.user._id
    user.save()

    return res.json({
        status: 200,
        data: user
    })
})



const deleteById = catchAsync(async (req, res) => {

    const { userId } = pick(req.params, ['userId']);

    const user = await User.findOne({
        _id: userId,
        accountStatus: 'INACTIVE',
        deletedById: { $exists: false },
    });

    if (!user) throw createError.NotFound(`User ${userId} not found`)

    // await User.deleteOne({ _id: userId })
    user.deletedById = req.user._id;
    user.deletedAt = new Date();
    user.save()

    return res.json({
        status: 200,
        data: user
    })
})



export default {
    getAll,
    getById,
    updateById,

    changeStatusById,
    deleteById,
}