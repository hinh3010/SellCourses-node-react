const mongoose = require('mongoose')
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.PROGRESSION


const progressionSchema = mongoose.Schema(
    {
        onModel: {
            type: String,
            enum: [tableType.COURSE, tableType.LESSON],
            required: true,
            private: true,
        },
        onModelType: {
            type: String,
            ENUM: ['COURSE', 'LESSON'],
            required: true,
        },
        progress: {
            type: Number,
            default: 0,
        },

        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableName,
        },

        status: {
            type: String,
            enum: enumType.PROGRESSION_STATUS,
            default: constType.DOING,
        },

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
progressionSchema.plugin(plugin.paginatePlugin);
progressionSchema.plugin(plugin.paginatePluginV2);
progressionSchema.plugin(plugin.jsonPlugin);

// filter & search
progressionSchema.index({ content: 'text' }, { name: 'search' });

const ProgressionModel = mongoose.model(tableName, progressionSchema)

export default ProgressionModel