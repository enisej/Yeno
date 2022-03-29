class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message ='404 Page not found!')
    }

    static internal(message) {
        return new ApiError(500, message ='500 Server error!')
    }

    static forbidden(message) {
        return new ApiError(403, message='403 Forbidden!')
    }

    static NotAutorized(message){
        return new ApiError(401, message='Not autorized')
    }

    static custom(message) {
        return new ApiError(403, message)
    }


}

module.exports = ApiError