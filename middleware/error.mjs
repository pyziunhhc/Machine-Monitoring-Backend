export const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            console.log(error);
            return next(error)
        })
    }
}

export const catchLogin = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            res.status(401).send({
                success: false,
                message: [error]
            })
        })
    }
}
export default {}
// export default {
//     catchAsync,
//     catchLogin
// }