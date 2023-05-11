class UsersController extends require('../Controller')
{
    bcrypt = require('bcrypt');
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

}

module.exports = UsersController;
