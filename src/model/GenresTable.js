
class GenresTable extends require('./Table.js') {

    joiSchema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
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
                    return err;
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
                    return err;
                });
        }
        return await this.connection(findById);
    }

    async save (data) {
        let save = async () => {
            let genre = new this.Genres(data);
            return await genre.save();
        }
        return await this.connection(save);
    }

    async update (genre, data) {
        let update = async () => {
            return await genre.updateOne(data);
        }
        return await this.connection(update);
    }

    async delete (genre) {
        let update = async () => {
            return await genre.deleteOne();
        }
        return await this.connection(update);
    }
}

module.exports = new GenresTable();
