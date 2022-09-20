import joi from 'joi'
import patterm from '../pattern/index.pattern.js'

const register = data => {
    const userSchema = joi.object({
        email: joi.string().email().lowercase().required().pattern(patterm.email()),
        password: joi.string().min(6).max(33).required(),
        // displayName: joi.string().min(10).max(50).required()
    })
    return userSchema.validate(data)
}

const login = data => {
    const userSchema = joi.object({
        email: joi.string().email().lowercase().required().pattern(patterm.email()),
        password: joi.string().min(6).max(33).required(),
    })
    return userSchema.validate(data)
}

export default {
    register, login
}