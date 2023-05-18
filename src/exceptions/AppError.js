class AppError extends Error {
    status = 500;
    message = '';

    constructor(message, options) {
        super(message, options);
    }
}

module.exports = AppError;
