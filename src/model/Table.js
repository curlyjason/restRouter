
class Table {

    mongoose = require("mongoose");
    // Fawn = require("fawn");
    mongo = this.mongoose.mongo;

    database = 'vidly';

    Joi = require('joi');

    constructor() {
        // this.Fawn.init(this.mongoose);
    }

    async connection(callback) {
        return this.mongoose.connect(`mongodb://db:27017/${this.database}`, {
            authSource: "admin",
            user: "mongoadmin",
            pass: "mongoadmin",
        })
            .then(async () => {
                return await callback();
            })
            .catch((e) => {
                throw e;
            });

    }
}

module.exports = Table
