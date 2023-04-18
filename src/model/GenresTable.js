
class GenresTable extends require('./Table.js') {

    schema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
        id: this.Joi.number()
    });

    genreSchema = new this.mongoose.Schema({
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
                console.log(result);
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
