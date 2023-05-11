class UsersController extends require('../Controller')
{
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

        return await User.save(data);
    }

}

module.exports = UsersController;
