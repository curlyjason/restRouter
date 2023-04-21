
class MoviesTable extends require('./Table.js') {

    joiSchema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
    });

    schema = new this.mongoose.Schema({
        name: String,
        genre: {
            type: this.mongoose.Schema.Types.ObjectId,
            ref: 'Genres'
        }
    })

    Movies = this.mongoose.model('movies', this.schema);

    async find () {
        let find = async () => {
            return await this.Movies.find()
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
            return await this.Movies.findById(id)
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
            let entity = new this.Movies(data);
            return await entity.save();
        }
        return await this.connection(save);
    }

    async update (entity, data) {
        let update = async () => {
            return await entity.updateOne(data);
        }
        return await this.connection(update);
    }

    async delete (entity) {
        let update = async () => {
            return await entity.deleteOne();
        }
        return await this.connection(update);
    }
}

module.exports = new MoviesTable();
