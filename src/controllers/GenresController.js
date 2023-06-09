

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
            await super.edit(id, this.req.body);
            return {
                "status" : 302,
                "url" : '/genres/'
            }
        }
        return this.View.render();
    }

    async add() {
        if (this.req.method === 'POST') {
            console.log(`received add request: ${this.req.body.name}`);
            super.add({name: this.req.body.name});
            return {
                "status" : 302,
                "url" : '/genres/'
            }
        }
        return this.View.render();
    }
}

module.exports = GenresController
