
/**
 * Class implementing baseline API methods
 */
class Controller {
    alias = null;
    View = null;
    lo = require('lodash');

    /**
     * constructor
     * @param req
     * @param res
     * @param config
     */
    constructor(req = null, res = null, config = null) {
        this.req = req;
        this.res = res;
        this.alias = this.constructor.name.replace('Controller', '');
        this[this.alias] = require(`../model/${this.alias}Table`);
        this.View = new (require('../views/View'))(
            {controller: this}
        )
        this.allowedKeys = Object.keys(this[this.alias].schema.paths);
        this.set({allowedKeys: this.allowedKeys});
    }


    /**
     * get a collection
     *
     * @returns {[{name: string, id: number},{name: string, id: number}]}
     */
    async index() {
        return await this.defaultTable().find();
    }

    /**
     * view a single document
     *
     * @param id {number}
     * @returns {{name: string, id: number}|{name: string, id: number}} | undefined
     */
    async view(id) {
        return await this.defaultTable().findById(id);
    }

    /**
     * add a new documents
     *
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
        try {
            let entity = await this.defaultTable().findById(id);
            await this.defaultTable().update(entity, data);
            return entity;
        } catch (e) {
            return e;
        }
    }

    async delete(id) {
        let entity = await this.defaultTable().findById(id);
        if(entity && await this.defaultTable().delete(entity)){
            // console.log(entity);
            return entity;
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

    set(vars) {
        this.View.addVars(vars);
    }

}

module.exports = Controller;
