
class Controller {

    alias = null;

    constructor() {
        this.alias = this.constructor.name.replace('Controller', '');
        this[this.alias] = require(`../model/${this.alias}Table`)
        // console.log(this.defaultEntity());
    }


    /**
     * @returns {[{name: string, id: number},{name: string, id: number}]}
     */
    async index() {
        console.log('waiting...');
        return await this.defaultTable().find();
    }

    /**
     * @param id
     * @returns {{name: string, id: number}|{name: string, id: number}} | undefined
     */
    async view(id) {
        return await this.defaultTable().findById(id);
    }

    /**
     * @param {{name}} data
     * @returns {{name, id: *}}
     */
    async add(data) {
        let { error } = this.defaultTable().joiSchema.validate(data);
        if(error) return {
            error: error.message,
            post_data: data
        };

        return await this.defaultTable().save(data);
    }

    async edit(id, data) {
        let entity = await this.defaultTable().findById(id);
        return await this.defaultTable().update(entity, data);
    }

    async delete(id) {
        let entity = await this.defaultTable().findById(id);
        if(entity){
            return await this.defaultTable().delete(entity);
        }
        else {
            return new Error('Record not found');
        }
    }
    defaultTable() {
        return this[this.alias];
    }

    defaultEntity() {
        return this.alias.toLowerCase().replace(/s$/, '');
    }

}

module.exports = Controller;
