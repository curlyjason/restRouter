

class MoviesController extends require('./Controller') {

    Genres = require('../model/GenresTable');

    async index() {
        this.set({movies: super.index()});
        return this.View.render();
    }

    async view(id) {
        this.set({movie: super.view(id)})
        return this.View.render();
    }

    async edit(id) {
        this.set({movie: super.view(id)})
        if (this.req.method === 'POST') {
            console.log(this.req.body);
            await super.edit(id, this.req.body);
            return {
                "status" : 302,
                "url" : '/movies/'
            }
        }
        let options = await this.Genres.find();
        this.set({genres: options});
        return this.View.render();
    }

    async add() {
        if (this.req.method === 'POST') {
            super.add(this.req.body);
            return {
                "status" : 302,
                "url" : '/movies/'
            }
        }
        let options = await this.Genres.find();
        this.set({genres: options});
        return this.View.render();
    }
}

module.exports = MoviesController
