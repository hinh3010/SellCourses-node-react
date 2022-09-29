import Logger from "../../logger";


const log = new Logger(__filename)

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => {
            console.info(`
                [${new Date().toLocaleString()}] 
                Incoming ${req.method}${req.originalUrl} 
                Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}
                
                Message err ${err.message}
                Status err ${err.status}
            `);
            log.error(`${err.message} : ${err.status}`);
            next(err)
        })
}

export default catchAsync
