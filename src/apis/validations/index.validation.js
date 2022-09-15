import userValidate from "./user.validation.js"

const validate = {
    user: {
        register: userValidate.register,
        login: userValidate.login,
    }
}

export default validate