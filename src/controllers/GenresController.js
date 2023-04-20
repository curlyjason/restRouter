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

    async edit(id, data) {
        let genre = await this.Genres.findById(id);
        return await this.Genres.update(genre, data);
    }

    async delete(id) {
        let genre = await this.Genres.findById(id);
        if(genre){
            return await this.Genres.delete(genre);
        }
        else {
            return new Error('Record not found');
        }
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
