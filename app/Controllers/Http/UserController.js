'use strict'

const Logger = use('Logger');
const User = use('App/Models/User');
const { validate, sanitize } = use('Validator')

class UserController {
    async create({ request, response }) {
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:255',
			email: 'required|email|min:3|max:255|unique:users,email',
			password: 'required'
        })
        
        if (validation.fails()) return validation.messages()
        
        try {
            const data = sanitize(request.all(), {
                email: 'normalize_email'
            })
    
            if(!data || data == undefined) return { error: "Error in request body" };
            
            const user = User.create(data);
            
            return user;
            
        } catch (error) {
            response.status(404).send(error.message);
        }
    }

    async show ({ params, request, response, auth }) {
        try {
            const user =  await User.find(params.id);
    
            if(!user || user == undefined) return { error: "User not found." };
    
            delete user.password;
    
            return user;
        } catch (error) {
            response.status(404).send(error.message);
        }
    }

    async update({ params, request, response, auth }) {
        const validation = await validate(request.all(), {
            name: 'required|min:3|max:255',
        });

        if(validation.fails()) return validation.messages();

        try {
            if(auth.user.id != params.id) return { error: "You are not authorized to make this change." };
    
            const user =  await User.find(params.id);
    
            user.name = request.input('name');
            
            await user.save();
            
            return user;
        } catch (error) {
            response.status(404).send(error.message);
        }
    }
    
    async destroy ({ params, request, response, auth }) {
        if(auth.user.id != params.id) return { error: "You are not authorized to make this change." };

        try {
            const user =  await User.find(params.id);
            
            await user.delete();
    
            return { message: "User successfully deleted." };
        } catch (error) {
            response.status(404).send(error.message);
        }
    }
};

module.exports = UserController;
