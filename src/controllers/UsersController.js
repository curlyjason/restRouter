

class UsersController extends require('./Controller') {

    async index() {
        this.set({users: super.index()});
        return this.View.render();
    }

    async view(id) {
        this.set({user: super.view(id)})
        return this.View.render();
    }

    async edit(id) {
        this.set({user: super.view(id)})
        if (this.req.method === 'POST') {
            console.log(this.req.body);
            await super.edit(id, this.req.body);
            return {
                "status" : 302,
                "url" : '/users/'
            }
        }
        return this.View.render();
    }

    async add() {
        if (this.req.method === 'POST') {
            super.add(this.req.body);
            return {
                "status" : 302,
                "url" : '/users/'
            }
        }
        return this.View.render();
    }
}

module.exports = UsersController
