const ApiError = require('./ApiError');

function apiErrorHandler (err, req, res, next) {
    console.error(err);

    // if our error is expected, return status Quo (err.code) & message to user
    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;