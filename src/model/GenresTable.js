
const Table = require('./Table.js');
const mongoose = require("mongoose");

class GenresTable extends Table {

    prop = 'something';

    // Joi = require('joi');

    schema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
        id: this.Joi.number()
    });

    genreSchema = new mongoose.Schema({
        name: String,
    })
    // genreSchema = new mongoose.Schema(this.schema)

    Genres = this.mongoose.model('genres', this.genreSchema);

    async find () {
        // await this._getConnection(()=>{return 'using nodemon'});
        await this._getConnection()
            .then((result) => {
                console.log('Connected to database...')
                // const genres = this.Genres.find().exec();
                // console.log(genres);
            })
            .catch((err) => {
                console.log('Failed connecting to database ' + err.message)
            });
        const result =  await this.Genres.find()
            .then((result) => {
                // console.log("Return From Database: " + result)
                return result;
            })
            .catch((err) => {
                console.log(err.message)
            })

        return result;
    }
}

module.exports = new GenresTable();
