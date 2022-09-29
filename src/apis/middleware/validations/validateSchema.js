import Joi from "joi";
import patterm from "../../pattern/index.pattern";
import constType from "../../types/const.type";
import enumType from "../../types/enum.type";

const idSchema = Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const userSchema = Joi.object().keys({
    email: Joi.string().email().lowercase().required().pattern(patterm.email()),
    password: Joi.string().min(6).max(33).required(),
})

const register = Joi.object({
    email: Joi.string().trim().email().lowercase().required().pattern(patterm.email()),
    password: Joi.string().trim().min(6).max(33).required(),
    firstName: Joi.string().trim().min(2).max(33).required(),
    lastName: Joi.string().trim().min(2).max(33).required(),
    displayName: Joi.string(),
    accountType: Joi.array().items(Joi.string().valid(...Object.values(enumType.ACCOUNT_TYPE_REGISTER))),
    phone: Joi.string().trim().required()
})

const login = Joi.object({
    email: Joi.string().trim().email().lowercase().required().pattern(patterm.email()),
    password: Joi.string().trim().min(6).max(33).required(),
})

const schemaValidator = {
    idSchema,
    userSchema,

    register, login
}

export default schemaValidator