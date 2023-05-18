
class MissingControllerError extends require('./AppError') {
    constructor(controller, options) {
        let message = `The endpoint ${controller} is not allowed.`;
        super(message, options);
    }

}

module.exports = MissingControllerError;
