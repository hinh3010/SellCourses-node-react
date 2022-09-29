import createError from 'http-errors';

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            // return res.status(400).json(validatorResult.error.details[0].message)
            throw createError.BadRequest(validatorResult.error.details[0].message)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.body = validatorResult.value
            next()
        }
    }
}

export default validateBody