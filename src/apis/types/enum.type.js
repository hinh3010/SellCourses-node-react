import constType from "./const.type"

const ACCOUNT_TYPE = [
    constType.ADMIN,
    constType.MENTOR,
    constType.STUDENT,
    constType.SUPER_ADMIN
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
    ACCOUNT_TYPE,
    AUTH_TYPE,
    ACCOUNT_STATUS,
    TOKEN_TYPE
}
export default enumType