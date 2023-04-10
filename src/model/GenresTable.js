const mongoose = require('mongoose');
// import mongoose from "mongoose";
const {mongo} = mongoose;
const alias = 'Genre';

mongoose.connect('mongodb://db:27017/vidly', {
    authSource: "admin",
    user: "mongoadmin",
    pass: "mongoadmin",
})
    .then(() => {
            console.log('Connected to mongo db...');
        }
    )
    .catch((err) => console.log('Problem with connection', err));

const schema = new mongoose.Schema({
    name: String,
})

// const {$alias} = mongoose.model(alias, schema);

module.exports = mongoose.model(alias, schema);
