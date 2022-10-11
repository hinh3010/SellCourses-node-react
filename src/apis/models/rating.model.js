const mongoose = require('mongoose')
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.RATING


const ratingSchema = mongoose.Schema(
    {
        targetModelId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'onModel',
        },
        onModel: {
            type: String,
            enum: [tableType.COURSE, tableType.USER, tableType.POST],
            required: true,
            private: true,
        },
        content: {
            type: String,
            required: false,
        },


        // status
        cmsStatus: { type: String, enum: enumType.CMS_STATUS, default: constType.ACTIVE },
        cmsContentReport: { type: String, default: null },

        // delete
        deletedAt: { type: Date, default: null },
        isDelete: { type: Boolean, default: false },
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
ratingSchema.plugin(plugin.paginatePlugin);
ratingSchema.plugin(plugin.paginatePluginV2);
ratingSchema.plugin(plugin.jsonPlugin);

lessonSchema.index({ content: 'text' }, { name: 'search' });

const RatingModel = mongoose.model(tableName, ratingSchema)

export default RatingModel