class MoviesController
{

    Movies = require('../../model/MoviesTable');

    /**
     * @returns {[{name: string, id: number},{name: string, id: number}]}
     */
    async index() {
        console.log('waiting...');
        return await this.Movies.find();
    }

    /**
     * @param id
     * @returns {{name: string, id: number}|{name: string, id: number}} | undefined
     */
    async view(id) {
        return await this.Movies.findById(id);
    }

    /**
     * @param {{name}} data
     * @returns {{name, id: *}}
     */
    async add(data) {
        let { error } = this.Movies.joiSchema.validate(data);
        if(error) return {
            error: error.message,
            post_data: data
        };

        return await this.Movies.save(data);
    }

    async edit(id, data) {
        let genre = await this.Movies.findById(id);
        return await this.Movies.update(genre, data);
    }

    async delete(id) {
        let genre = await this.Movies.findById(id);
        if(genre){
            return await this.Movies.delete(genre);
        }
        else {
            return new Error('Record not found');
        }
    }
}

module.exports = new MoviesController();
