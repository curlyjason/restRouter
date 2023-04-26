
class Controller {

    alias = null;

    constructor() {
        this.alias = this.constructor.name.replace('Controller', '');
        this[this.alias] = require(`../model/${this.alias}Table`)
        // console.log(this.defaultEntity());
    }

    defaultTable() {
        return this[this.alias];
    }

    defaultEntity() {
        return this.alias.toLowerCase().replace(/s$/, '');
    }

}

module.exports = Controller;
