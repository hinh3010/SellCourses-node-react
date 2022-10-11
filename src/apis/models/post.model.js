const mongoose = require('mongoose')
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.POST


const postSchema = mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        imgUrl: { type: String, default: null },
        videoUrl: { type: String, default: null },

        hashtags: [String],

        content: {
            type: String,
        },

        price: { type: Number, default: 0 },
        averageRatings: { type: Number, default: 0 },

        isLike: {
            type: Boolean,
            default: false
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
postSchema.plugin(plugin.paginatePlugin);
postSchema.plugin(plugin.paginatePluginV2);
postSchema.plugin(plugin.jsonPlugin);

// filter & search
postSchema.index({ content: 'text', hashtags: 'text', name: 'text' }, { name: 'search' });

const PostModel = mongoose.model(tableName, postSchema)

export default PostModel