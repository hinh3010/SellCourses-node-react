const mongoose = require('mongoose')
const validator = require('validator')
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email')
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number')
                }
            },
            private: true,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    try {
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