
class UsersTable extends require('./Table.js') {

    joiSchema = this.Joi.object({
        name: this.Joi.string().pattern(/^[a-zA-Z_ -]{3,100}$/).required(),
        email: this.Joi.string().required().email(),
        password: this.Joi.string().required()
    });

    schema = new this.mongoose.Schema({
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String
    })

    Users = this.mongoose.model('users', this.schema);

    async find () {
        let find = async () => {
            return await this.Users.find()
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
            return await this.Users.findById(id)
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
            let entity = new this.Users(data);
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

module.exports = new UsersTable();
