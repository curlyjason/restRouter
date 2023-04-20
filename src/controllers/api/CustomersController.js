class CustomersController
{

    Customers = require('../../model/CustomersTable');

    /**
     * @returns {[{name: string, id: number},{name: string, id: number}]}
     */
    async index() {
        console.log('waiting...');
        return await this.Customers.find();
    }

    /**
     * @param id
     * @returns {{name: string, id: number}|{name: string, id: number}} | undefined
     */
    async view(id) {
        return await this.Customers.findById(id);
    }

    /**
     * @param {{name}} data
     * @returns {{name, id: *}}
     */
    async add(data) {
        let { error } = this.Customers.joiSchema.validate(data);
        if(error) return {
            error: error.message,
            post_data: data
        };

        return await this.Customers.save(data);
    }

    async edit(id, data) {
        let entity = await this.Customers.findById(id);
        return await this.Customers.update(entity, data);
    }

    async delete(id) {
        let entity = await this.Customers.findById(id);
        if(entity){
            return await this.Customers.delete(entity);
        }
        else {
            return new Error('Record not found');
        }
    }
}

module.exports = new CustomersController();
