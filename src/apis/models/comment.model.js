const mongoose = require('mongoose')
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.COMMENT


const commentSchema = mongoose.Schema(
    {
        onModel: {
            type: String,
            require: true,
            enum: [tableType.POST, tableType.LESSON],
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableName,
        },
        content: {
            type: String,
        },

        imgUrl: { type: String, default: null },
        videoUrl: { type: String, default: null },

        price: { type: Number, default: 0 },
        averageRatings: { type: Number, default: 0 },

        isLike: {
            type: Boolean,
            default: false
        },

        author: {
            type: String, default: 'Anonymous'
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
commentSchema.plugin(plugin.paginatePlugin);
commentSchema.plugin(plugin.paginatePluginV2);
commentSchema.plugin(plugin.jsonPlugin);

// filter & search
commentSchema.index({ content: 'text' }, { name: 'search' });

const CommentModel = mongoose.model(tableName, commentSchema)

export default CommentModel