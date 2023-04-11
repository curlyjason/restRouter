class Genres2Table {

    Joi = require('joi');

    schema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
        id: this.Joi.number()
    });

    find () {
        return [
            {id: "sample id 1", name: "sample genre 1"},
            {id: "sample id 2", name: "sample genre 2"},
            {id: "sample id 3", name: "sample genre 3"},
        ];
    }
}

module.exports = new Genres2Table();
