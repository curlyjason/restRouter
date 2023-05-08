
class CustomersTable extends require('./Table.js') {

    joiSchema = this.Joi.object({
        isGold: this.Joi.boolean(),
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
        phone: this.Joi.string()
            .pattern(/[0-9()\-ext.]{10,22}/)
            .required()
    });

    schema = new this.mongoose.Schema({
        isGold: Boolean,
        name: String,
        phone: String,
        totalRentals: Number
    })

    Customers = this.mongoose.model('customers', this.schema);

    async find () {
        let find = async () => {
            return await this.Customers.find()
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
            return await this.Customers.findById(id)
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
            let entity = new this.Customers(data);
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

module.exports = new CustomersTable();
