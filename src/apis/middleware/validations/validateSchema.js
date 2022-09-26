import Joi from "joi";
import patterm from "../../pattern/index.pattern";

const idSchema = Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const userSchema = Joi.object().keys({
    email: Joi.string().email().lowercase().required().pattern(patterm.email()),
    password: Joi.string().min(6).max(33).required(),
})

const register = Joi.object({
    email: Joi.string().email().lowercase().required().pattern(patterm.email()),
    password: Joi.string().min(6).max(33).required(),
})
const login = Joi.object({
    email: Joi.string().email().lowercase().required().pattern(patterm.email()),
    password: Joi.string().min(6).max(33).required(),
})

const schemaValidator = {
    idSchema,
    userSchema,

    register, login
}

export default schemaValidator