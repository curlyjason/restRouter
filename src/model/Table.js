const mongoose = require("mongoose");
// import mongoose from "mongoose";
const {mongo} = mongoose;

class Table {

    Joi = require('joi');

    async _getConnection() {
        return mongoose.connect('mongodb://db:27017/vidly', {
            authSource: "admin",
            user: "mongoadmin",
            pass: "mongoadmin",
        })
    }
}

module.exports = Table
