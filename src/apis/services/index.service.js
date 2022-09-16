import jwtService from "./jwt.service.js"

const service = {
    //     jwt: {
    //         signAccessToken: jwtService.signAccessToken,
    //         verifyAccessToken: jwtService.verifyAccessToken,
    //         signRefreshToken: jwtService.signRefreshToken,
    //     }
    jwt: jwtService
}

export default service