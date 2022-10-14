import createError from 'http-errors';
import AdsModel from '../models/ads.model';
import service from '../services/index.service';
import catchAsync from '../utils/catch-async';
import pick from '../utils/pick';


const getAll = catchAsync(async (req, res) => {

    const filters = pick(req.query, ['cmsStatus', 'isDelete']);
    const options = pick({ ...req.query }, ['sort', 'limit', 'page']);

    const adsList = await service.ads.getAllServices({ filters, options, isDelete: filters.isDelete })

    return res.json({
        status: 200,
        data: adsList
    })
})



const create = catchAsync(async (req, res) => {

    const prevAds = await AdsModel.findOne({
        deletedById: { $exists: false },
    }).sort({ position: -1 });

    if (!req.body.position)
        req.body.position = prevAds && prevAds.position && typeof prevAds.position === 'number' ? prevAds.position + 1 : 1


    const ads = new AdsModel({ ...req.body, createdById: req.user._id })
    const newCourse = await ads.save()


    return res.json({
        status: 200,
        data: newCourse,
    })
})


const getById = catchAsync(async (req, res) => {

    const adsId = req.params.adsId

    const ads = await AdsModel.findOne(
        {
            _id: adsId,
            deletedById: { $exists: false },
        }
    ).populate('createdById', 'displayName avatarUrl email phone averageRatings')

    if (!ads) {
        throw createError.NotFound(`AdsModel ${adsId} not found`)
    }
    return res.json({
        status: 200,
        data: ads
    })
})

const updateById = catchAsync(async (req, res) => {

    const { adsId } = pick(req.params, ['adsId']);
    // const adsId = req.params.adsId

    const adsById = await AdsModel.findOne(
        {
            _id: adsId,
            deletedById: { $exists: false },
        }
    )
    if (!adsById) throw createError.NotFound(`AdsModel ${adsId} not found`)

    const body = req.body
    const ads = await AdsModel.findOneAndUpdate(
        {
            _id: adsId,
        },
        body,
        {
            new: true,
        }
    ).populate('createdById', 'displayName avatarUrl email phone averageRatings')


    return res.json({
        status: 200,
        data: ads
    })
})



const softDeleteById = catchAsync(async (req, res) => {

    const { adsId } = pick(req.params, ['adsId']);

    const ads = await AdsModel.findOne({
        _id: adsId,
        deletedById: { $exists: false },
    });

    if (!ads || ads.cmsStatus === 'ACTIVE')
        throw createError.NotFound(`AdsModel ${adsId} not found`)


    // await AdsModel.deleteOne({ _id: adsId })
    ads.deletedById = req.user._id;
    ads.deletedAt = new Date();
    await ads.save()

    return res.json({
        status: 200,
        data: ads
    })
})


const deletedById = catchAsync(async (req, res) => {

    const { adsId } = pick(req.params, ['adsId']);

    const ads = await AdsModel.findOne({
        _id: adsId,
        deletedById: { $exists: true },
    });

    if (!ads)
        throw createError.NotFound(`AdsModel ${adsId} not found`)

    await AdsModel.deleteOne({ _id: adsId })

    return res.json({
        status: 200,
        data: ads
    })
})

const undoById = catchAsync(async (req, res) => {

    const { adsId } = pick(req.params, ['adsId']);

    const ads = await AdsModel.findOne(
        {
            _id: adsId,
            deletedById: { $exists: true },
        }
    )
    if (!ads) throw createError.NotFound(`AdsModel ${adsId} not found`)

    ads.deletedAt = null
    ads.deletedById = undefined
    await ads.save()

    return res.json({
        status: 200,
        data: ads
    })
})

export default {
    getAll, create,
    getById, updateById,
    softDeleteById, deletedById, undoById
}