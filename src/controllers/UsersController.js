

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

    async auth() {
        if (this.req.method === 'POST') {
            const valid = (value) => {
                return typeof value === "string" && value.length > 0;
            }
            const {email, password} = this.req.body;

            if (!(valid(email) && valid(password))) return 'email and password are required';
            // if (!(valid(email) && valid(password))) return {
            //     error: 'email and password are required',
            //     post_data: this.req.body
            // }
            return "valid post data received";
        }
        return 'GET falls through to rendering';
    }
}



module.exports = UsersController
