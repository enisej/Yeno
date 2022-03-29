const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");

module.exports = function(status) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return next(ApiError.NotAutorized())
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.status !== status) {
                return next(ApiError.forbidden())
            }
            req.user = decoded;
            next()
        } catch{
            return next(ApiError.NotAutorized())
        }
    };
}
