
class Table {

    mongoose = require("mongoose");
    mongo = this.mongoose.mongo;

    database = 'vidly';

    Joi = require('joi');

    async connection(callback) {
        return this.mongoose.connect(`mongodb://db:27017/${this.database}`, {
            authSource: "admin",
            user: "mongoadmin",
            pass: "mongoadmin",
        })
            .then(async () => {
                return await callback();
            })
            .catch((err) => {
                console.log('Failed connecting to database ' + err.message)
                return err;
            });

    }
}

module.exports = Table
