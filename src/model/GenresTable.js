const BadIdentifierError = require("../exceptions/BadIdentifierError");

class GenresTable extends require('./Table.js') {

    joiSchema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
    });

    schema = new this.mongoose.Schema({
        name: String,
    })

    Genres = this.mongoose.model('genres', this.schema);

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
                    return result ?? {};
                })
                .catch((e) => {
                    if (e.message.includes('Cast to ObjectId failed')) {
                        throw new BadIdentifierError(id, {cause: e, status: 500});
                    }
                    throw e;
                })
        }
        return await this.connection(findById);
    }

    async save (data) {
        let save = async () => {
            let entity = new this.Genres(data);
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

module.exports = new GenresTable();
