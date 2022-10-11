const mongoose = require('mongoose')
const validator = require('validator')
import bcrypt from 'bcrypt';
import constType from '../types/const.type';
import enumType from '../types/enum.type';
import tableType from '../types/table.type';
import plugin from './plugins/index.plugin';

const tableName = tableType.USER


const userSchema = mongoose.Schema(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        displayName: { type: String, trim: true },
        avatarUrl: { type: String, default: null },
        email: { type: String, unique: true, trim: true, lowercase: true },
        accountType: { type: [String], enum: enumType.ACCOUNT_TYPE, default: [constType.STUDENT] },
        password: { type: String, trim: true },
        phone: { type: String, unique: true },
        averageRatings: { type: Number, default: 0 },

        // link
        socialLink: {
            type: [
                {
                    socialName: { type: String },
                    socialUrl: { type: String }
                },
            ],
            default: null
        },

        // status
        accountStatus: {
            type: String,
            enum: enumType.ACCOUNT_STATUS,
            default: constType.ACTIVE,
        },

        // delete
        deletedAt: { type: Date, default: null },
        isDelete: { type: Boolean, default: false },
        deletedById: {
            type: mongoose.Schema.Types.ObjectId,
            // type: mongoose.SchemaTypes.ObjectId,
            ref: tableName,
            required: false,
        },

        // auth
        authGoogleID: { type: String, default: null },
        authFacebookID: { type: String, default: null },
        authType: { type: String, enum: enumType.AUTH_TYPE, default: constType.LOCAL },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
)

userSchema.pre('save', function (next) {
    try {
        if (this.authType !== constType.LOCAL) next()
        const hashPassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
        this.password = hashPassword
        next()
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isCheckPassword = function (password) {
    try {
        return bcrypt.compareSync(password, this.password)
    } catch (error) {
        next(error);
    }
}

// plugin
userSchema.plugin(plugin.paginatePlugin);
userSchema.plugin(plugin.paginatePluginV2);
userSchema.plugin(plugin.jsonPlugin);

// filter & search
userSchema.index({ email: 'text', firstName: 'text', lastName: 'text', phone: 'text' }, { name: 'search' });

const User = mongoose.model(tableName, userSchema)

export default User