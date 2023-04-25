class GenresController
{

    Genres = require('../../model/GenresTable');

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
}

module.exports = GenresController;
