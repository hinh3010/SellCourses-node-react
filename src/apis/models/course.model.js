const mongoose = require('mongoose')
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.COURSE


const courseSchema = mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableType.USER,
            required: false,
        },
        introduction: { type: String, default: null },
        description: { type: String, default: null },

        imgUrl: { type: String, required: true },
        videoUrl: { type: String, default: null },

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
// courseSchema.plugin(plugin.paginatePlugin);
courseSchema.plugin(plugin.paginatePluginV2);
courseSchema.plugin(plugin.jsonPlugin);
courseSchema.plugin(plugin.privatesPlugin);
courseSchema.plugin(plugin.aggregatePaginatePlugin);

// filter & search
courseSchema.index({ name: 'text', description: 'text', introduction: "text" }, { name: 'search' });

const CourseModel = mongoose.model(tableName, courseSchema)

export default CourseModel