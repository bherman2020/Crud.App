class ApiError {
    constructor (code, message) {
    this.code = code; 
    this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }
//return internal service error to not leak info
    static internal(msg) {
        return new ApiError(500, msg);
    }
}

module.exports = ApiError;

