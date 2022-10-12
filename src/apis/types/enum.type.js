import constType from "./const.type"

const ACCOUNT_TYPE = [
    constType.MENTOR,
    constType.STUDENT,
    // constType.ADMIN,
    // constType.SUPER_ADMIN
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

const COURSE_STATUS = [
    constType.ACTIVE,
    constType.INACTIVE
]

const CMS_STATUS = [
    constType.ACTIVE,
    constType.INACTIVE
]

const PROGRESSION_STATUS = [
    constType.DOING,
    constType.DONE,
    constType.NOT_STARTED
]


const enumType = {
    ACCOUNT_TYPE, ACCOUNT_TYPE_REGISTER,
    AUTH_TYPE,
    ACCOUNT_STATUS,
    TOKEN_TYPE,

    COURSE_STATUS,
    CMS_STATUS,
    PROGRESSION_STATUS
}
export default enumType