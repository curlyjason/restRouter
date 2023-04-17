
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
        this.Genres.find()
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err.message)
            })
        // this.mongoose.find()
        // console.log("finding records...");
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => resolve([
        //         {id: "sample id 1", name: "sample genre 1"},
        //         {id: "sample id 2", name: "sample genre 2"},
        //         {id: "sample id 3", name: "sample genre 3"},
        //     ]), 4000)
        // })
        //     .then(
        //         function (result) {
        //             console.log('done waiting.');
        //             console.log(result);
        //             return result;
        //         },
        //         function (error) {
        //             console.log('something went wrong.');
        //         }
        //     );
    }
}

module.exports = new GenresTable();
