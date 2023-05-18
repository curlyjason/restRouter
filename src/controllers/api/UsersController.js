class UsersController extends require('../Controller')
{
    config = require('config');
    bcrypt = require('bcrypt');
    jwt = require('jsonwebtoken');
    async add(data) {
        const User = this.defaultTable();
        let { error } = User.joiSchema.validate(data);

        if(error) return {
            error: error.message,
            post_data: data
        };

        console.log(data.email);

        let user = await User.find( {"email" : data.email});

        if(user.length > 0){
            return {
                error: "User already exists.",
                post_data: data
            };
        }

        const salt = await this.bcrypt.genSalt(10);
        data.password = await this.bcrypt.hash(data.password, salt);

        user = await User.save(data);

        return this.lo.pick(user, ['name', 'email']);
    }

    async auth() {
        const User = this.defaultTable();
        //validator
        const valid = (value) => {
            return typeof value === "string" && value.length > 0;
        }
        const {email, password} = this.req.body;
        if (!(valid(email) && valid(password))) throw new Error("Email and password are required.");

        //find the user
        let user = await User.find( {"email" : email});
        if(user.length === 0) throw new Error("Unknown user name or password.");
        user = user[0];

        //compare password
        let validPassword = await this.bcrypt.compare(password, user.password);
        if(!validPassword) throw new Error("Unknown password or user name.");

        //return result
        return this.jwt.sign({email: user.email, _id: user._id},
            this.config.get('jwtPrivateKey'));
    }

}

module.exports = UsersController;
