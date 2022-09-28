const mongoose = require('mongoose')
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';



const tableName = tableType.TOKEN
const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: tableType.USER,
            required: true,
        },
        type: {
            type: String,
            enum: [enumType.TOKEN_TYPE],
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.plugin(plugin.jsonPlugin);


const Token = mongoose.model(tableName, tokenSchema)

export default Token
