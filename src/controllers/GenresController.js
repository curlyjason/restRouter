class GenresController
{
    data = [
        {id: 1, name: 'SciFi'},
        {id: 2, name: 'Mystery'},
    ]

    Joi = require('joi');

    schema = this.Joi.object({
        name: this.Joi.string()
            .pattern(/^[a-zA-Z_ -]{3,100}$/)
            .required(),
        id: this.Joi.number()
    });

    Genres = require('../model/GenresTable');



    /**
     * @returns {[{name: string, id: number},{name: string, id: number}]}
     */
    async index() {
        console.log('waiting...');
        return await this.Genres.find();
    }

    /**
     * @param id
     * @returns {{name: string, id: number}|{name: string, id: number}} | undefined
     */
    async view(id) {
        return await this.Genres.findById(id);
    }

    /**
     * @param {{name}} data
     * @returns {{name, id: *}}
     */
    async add(data) {
        let { error } = this.Genres.joiSchema.validate(data);
        if(error) return {
            error: error.message,
            post_data: data
        };

        return await this.Genres.save(data);
    }

    edit(id, data) {
        let genre = this.findById(id);
        genre.name = data.name;

        let { error } = this.schema.validate(genre);
        if(error) return {
            error: error.message,
            post_data: data
        };

        return genre;
    }

    delete(id) {
        let index = this.findIndexOf(id);
        if (!index) {return false}

        let genre = {};
        genre = Object.assign(genre, this.data[index]);

        this.data.splice(index, 1);
        return genre;
    }

    findById(id) {
        return this.data.find(
            (value, index, collection) => {
                return value.id === +id;
            })
    }
    
    findIndexOf(id) {
        return this.data.findIndex(
            (value,index,obj) => {
                return value.id === +id;
            }
        )
    }

    /**
     * @todo This should be abstracted to a 'Table'?
     *
     * @returns {*}
     */
    getNewId() {
        return this.data[this.data.length - 1].id + 1;
    }
}

module.exports = new GenresController();
