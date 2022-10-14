import adsService from "./ads.service.js"
import jwtService from "./jwt.service.js"

const service = {
    jwt: jwtService,
    ads: adsService,
}

export default service