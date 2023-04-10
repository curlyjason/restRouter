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
        // return {
        //     "blah" : "foo",
        //     "class" : this.Genres
        // }
        return await this.Genres.find().exec();
        // console.log(this.Genres);
        // return this.data;
    }

    /**
     * @param id
     * @returns {{name: string, id: number}|{name: string, id: number}} | undefined
     */
    view(id) {
        return this.findById(id);
    }

    /**
     * @param {{name}} data
     * @returns {{name, id: *}}
     */
    add(data) {
        let genre = {
            "name": data.name,
            "id": this.getNewId()
        }

        let { error } = this.schema.validate(genre);
        if(error) return {
            error: error.message,
            post_data: data
        };

        this.data.push(genre);

        return genre;
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
