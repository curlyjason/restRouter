

class GenresController extends require('./Controller') {

    async index() {
        this.set({genres: super.index()});
        return this.View.render();
    }

    async view(id) {
        this.set({genre: super.view(id)})
        return this.View.render();
    }

    async edit(id) {
        this.set({genre: super.view(id)})
        console.log(this.req.method);
        if (this.req.method === 'PATCH' || this.req.method === 'PUT') {
            this.set({genre: super.edit(id)})
            console.log('processing put/patch')
        }
        return this.View.render();
    }
}

module.exports = GenresController
