class AppError extends Error {
    status = 500;
    message = '';

    constructor(message, options) {
        super(message, options);
        this.message = message;
        this.status = options.status ?? 500;
    }
}

module.exports = AppError;
