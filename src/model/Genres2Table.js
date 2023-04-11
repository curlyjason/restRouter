// const {Promise} = require("mongoose");

class Genres2Table {

    Joi = require('joi');

    schema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
        id: this.Joi.number()
    });

    async find () {
        console.log("accessing database...");
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve([
                {id: "sample id 1", name: "sample genre 1"},
                {id: "sample id 2", name: "sample genre 2"},
                {id: "sample id 3", name: "sample genre 3"},
            ]), 4000)
        })
            .then(
                function (result) {
                    console.log('done waiting.');
                    console.log(result);
                    return result;
                },
                function (error) {
                    console.log('something went wrong.');
                }
            );
    }
}

module.exports = new Genres2Table();
