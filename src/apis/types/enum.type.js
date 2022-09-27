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

const enumType = {
    ACCOUNT_TYPE,
    AUTH_TYPE,
    ACCOUNT_STATUS
}
export default enumType