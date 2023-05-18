
require('../utility/Date');
class RentalsTable extends require('./Table.js') {
    CustomersTable = require('./CustomersTable');
    MoviesTable = require('./MoviesTable');
    joiSchema = this.Joi.object({
        rentalDate: this.Joi.date().required(),
        dueDate: this.Joi.date().required(),
        returned: this.Joi.boolean(),
        numberInStock: this.Joi.number(),
        dailyRentalRate: this.Joi.number(),
        genres: this.Joi.array()
    });

    schema = new this.mongoose.Schema({
        rentalDate: {type: Date, default: new Date()},
        dueDate: {type: Date, default: (new Date()).addDays(3)},
        returned: {type: Boolean, default: false},
        price: Number,
        customer: {
            type: this.CustomersTable.schema,
            required: true
        },
        movie: {
            type: this.MoviesTable.schema,
            required: true
        }
    })

    Rentals = this.mongoose.model('rentals', this.schema);

    async find () {
        let find = async () => {
            return await this.Rentals.find()
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err.message)
                    throw err;
                })
        };
        return await this.connection(find)
    }

    async findById (id) {
        let findById = async () => {
            return await this.Rentals.findById(id)
                // .populate('genres')
                // .select('name genres')
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    console.log(err.message)
                    throw err;
                });
        }
        return await this.connection(findById);
    }

    async save (data) {
        let save = async () => {
            let entity = new this.Rentals(data);
            // try {
            //     this.Fawn.Task()
            //         .save('rentals', entity)
            //         .update('movies', {_id: data.movies._id}, {
            //             $inc: {numberInStock: -1}
            //         })
            //         .update('customers', {_id: data.customer._id}, {
            //             $inc: {totalRentals: 1}
            //         })
            //         .run();
            //     return entity;
            // } catch (error) {
            //     return error;
            // }

            return await entity.save();
        }
        return await this.connection(save);
    }

    async update (entity, data) {
        //switch on rent or return or extension
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

module.exports = new RentalsTable();
