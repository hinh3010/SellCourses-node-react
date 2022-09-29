import constType from "./const.type"

const ACCOUNT_TYPE = [
    constType.ADMIN,
    constType.MENTOR,
    constType.STUDENT,
    constType.SUPER_ADMIN
]

const ACCOUNT_TYPE_REGISTER = [
    constType.MENTOR,
    constType.STUDENT
]

const ACCOUNT_STATUS = [
    constType.ACTIVE,
    constType.INACTIVE
]

const AUTH_TYPE = [
    constType.LOCAL,
    constType.FACEBOOK,
    constType.GOOGLE
]

const TOKEN_TYPE = [
    constType.ACCESS,
    constType.REFRESH,
    constType.RESET_PASSWORD,
    constType.VERIFY_EMAIL,
]


const enumType = {
    ACCOUNT_TYPE, ACCOUNT_TYPE_REGISTER,
    AUTH_TYPE,
    ACCOUNT_STATUS,
    TOKEN_TYPE
}
export default enumType