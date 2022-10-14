const mongoose = require('mongoose')
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.ADS


const adsSchema = mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        description: { type: String, default: null },
        imgUrl: { type: String, default: null },
        linkUrl: { type: String, required: true },
        totalClicks: { type: Number, default: 0 },
        position: {
            type: Number
        },

        // startTime: { type: Date, default: Date.now() },
        // endTime: { type: Date },

        // status
        cmsStatus: { type: String, enum: enumType.CMS_STATUS, default: constType.ACTIVE },
        changeCmsStatusById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableType.USER,
            default: null,
        },

        // delete
        deletedAt: { type: Date, default: null },
        deletedById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableType.USER,
            required: false,
        },

        createdById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableType.USER,
            required: false,
        },
        updatedById: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableType.USER,
            required: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)


// plugin
// adsSchema.plugin(plugin.paginatePlugin);
adsSchema.plugin(plugin.paginatePluginV2);
adsSchema.plugin(plugin.jsonPlugin);
adsSchema.plugin(plugin.privatesPlugin);
adsSchema.plugin(plugin.aggregatePaginatePlugin);

// filter & search
adsSchema.index({ name: 'text', description: 'text' }, { name: 'search' });

const AdsModel = mongoose.model(tableName, adsSchema)

export default AdsModel