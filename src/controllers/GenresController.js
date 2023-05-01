

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
        if (this.req.method === 'POST') {
            console.log(`recieved edit request: ${this.req.body.name}`);
            this.set({genre: super.edit(id, {name: this.req.body.name})});
        }
        return this.View.render();
    }

    async add() {
        // this.set({genre: super.view(id)})
        if (this.req.method === 'POST') {
            console.log(`recieved add request: ${this.req.body.name}`);
            this.set({genre: super.add({name: this.req.body.name})});
        }
        return this.View.render();
    }
}

module.exports = GenresController
