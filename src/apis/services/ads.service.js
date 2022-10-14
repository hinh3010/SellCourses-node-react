import AdsModel from "../models/ads.model"

const getAllServices = async ({ filters, options, isDelete }) => {
    isDelete = isDelete === 'true' ? true : isDelete === 'false' ? false : undefined
    if (typeof isDelete === "boolean") {
        filters.deletedById = { $exists: isDelete }
    }

    const adsList = await AdsModel.paginate(
        filters,
        // {
        //     ...filters,
        //     deletedById: { $exists: isDelete },
        // },
        {
            ...options, populate: [
                { path: 'createdById', select: 'displayName avatarUrl email phone' },
                { path: 'deletedById', select: 'displayName avatarUrl email phone' },
                { path: 'changeCmsStatusById', select: 'displayName avatarUrl email phone' },
                { path: 'updatedById', select: 'displayName avatarUrl email phone' },
            ]
            // ...options, populate: 'createdById'
        }
    )
    return adsList
}

export default {
    getAllServices
}