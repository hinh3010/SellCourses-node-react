import validateBody from "./validations/validateBody"
import validateParam from "./validations/validateParams"
import schemaValidator from "./validations/validateSchema"


const mdw = {
    validateParam: validateParam,
    validateBody: validateBody,
    schemaValidator: schemaValidator
}

export default mdw