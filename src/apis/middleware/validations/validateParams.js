const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validatorResult = schema.validate({ param: req.params[name] })
        if (validatorResult.error) {
            // return res.status(400).json(validatorResult.error.details[0].message)
            throw createError.BadRequest(validatorResult.error.details[0].message)
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.params[name] = req.params[name]
            next()
        }
    }
}

export default validateParam