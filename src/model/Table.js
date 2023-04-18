
class Table {

    mongoose = require("mongoose");
    mongo = this.mongoose.mongo;

    defaultDatabase = 'vidly';

    Joi = require('joi');

    async _getConnection(database = null) {
        database = database ?? this.defaultDatabase;
        return this.mongoose.connect(`mongodb://db:27017/${database}`, {
            authSource: "admin",
            user: "mongoadmin",
            pass: "mongoadmin",
        })
    }
}

module.exports = Table
