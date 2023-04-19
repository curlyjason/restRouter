
class GenresTable extends require('./Table.js') {

    joiSchema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
        id: this.Joi.number()
    });

    genreSchema = new this.mongoose.Schema({
        name: String,
    })

    Genres = this.mongoose.model('genres', this.genreSchema);

    async find () {
        let find = async () => {
            return await this.Genres.find()
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err.message)
                })
        };
        return await this.connection(find)
    }

    async findById (id) {
        let findById = async () => {
            return await this.Genres.findById(id)
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err.message)
                });
        }
        return await this.connection(findById);
    }
}

module.exports = new GenresTable();
