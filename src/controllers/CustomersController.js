

class CustomersController extends require('./Controller') {

    async index() {
        this.set({customers: super.index()});
        return this.View.render();
    }

    async view(id) {
        this.set({customer: super.view(id)})
        return this.View.render();
    }

    async edit(id) {
        this.set({customer: super.view(id)})
        if (this.req.method === 'POST') {
            console.log(`recieved edit request: ${this.req.body.name}`);
            let result = await super.edit(id, this.req.body);
            if (!result.error) {
                return {
                    "status" : 302,
                    "url" : '/customers/'
                }
            }
            this.set({error: result.error})
        }
        return this.View.render();
    }

    async add() {
        if (this.req.method === 'POST') {
            console.log(`received add request: ${this.req.body.name}`);
            let result = await super.add({name: this.req.body.name});
            if (!result.error) {
                return {
                    "status" : 302,
                    "url" : '/customers/'
                }
            }
            this.set({error: result.error})
        }
        return this.View.render();
    }
}

module.exports = CustomersController
