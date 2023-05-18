
class BadIdentifierError extends require('./AppError'){

    constructor(id, options) {
        let msg = "Invalid record identifier: " + id ?? 'undefined';
        super(msg,  options)
        // this.message = msg;
    }

}

module.exports = BadIdentifierError;