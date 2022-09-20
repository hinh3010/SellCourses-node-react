const mongoose = require('mongoose')
const validator = require('validator')
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        displayName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            // required: true,
            // validate(value) {
            //     if (!validator.isEmail(value)) {
            //         throw new Error('Invalid email')
            //     }
            // },
        },
        password: {
            type: String,
            trim: true,
            // required: true,
            // minlength: 6,
            // validate(value) {
            //     if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            //         throw new Error('Password must contain at least one letter and one number')
            //     }
            // },
            // private: true,
        },
        authGoogleID: {
            type: String,
            default: null
        },
        authFacebookID: {
            type: String,
            default: null
        },
        authType: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            default: 'local'
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', function (next) {
    try {
        if (this.authType !== 'local') next()
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

const User = mongoose.model('User', userSchema)

export default User