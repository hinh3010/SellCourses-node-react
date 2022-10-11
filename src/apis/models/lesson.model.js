const mongoose = require('mongoose')
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.LESSON


const lessonSchema = mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableType.COURSE,
        },
        name: { type: String, trim: true, required: true },

        introduction: { type: String, default: null },
        description: { type: String, default: null },

        imgUrl: { type: String, default: null },
        videoUrl: { type: String, default: null, required: true },

        position: {
            type: Number, default: 1
        },
        price: { type: Number, default: 0 },
        averageRatings: { type: Number, default: 0 },

        isMember: {
            type: Boolean,
            default: false,
        },


        // status
        status: { type: String, enum: enumType.COURSE_STATUS, default: constType.ACTIVE },
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
lessonSchema.plugin(plugin.paginatePlugin);
lessonSchema.plugin(plugin.paginatePluginV2);
lessonSchema.plugin(plugin.jsonPlugin);

// filter & search
lessonSchema.index({ name: 'text' }, { name: 'search' });

const LessonModel = mongoose.model(tableName, lessonSchema)

export default LessonModel