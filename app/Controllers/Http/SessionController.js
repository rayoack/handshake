'use strict'

const { validate } = use('Validator');
const Token = use('App/Models/Token');
const User = use('App/Models/User');
const Logger = use('Logger');

class SessionController {
  async create ({ request, auth }) {
    const validation = await validate(request.all(), {
      email: 'required|email|min:3|max:255',
      password: 'required'
    });
    
    if (validation.fails()) return validation.messages();

    try {
      const { email, password } = request.all();
  
      const token = await auth.attempt(email, password);
  
      return token;

    } catch (error) {
      response.status(404).send(error.message);
    }
  }
      
  async destroy ({ params, request, response, auth }) {
    if(auth.user.id != params.id) return { error: "You are not authorized to make this change." };

    try {
      const user =  await User.find(params.id);
      
      await auth
        .authenticator('jwt')
        .revokeTokensForUser(user)
  
      return { message: "User successfully logged out." };
      
    } catch (error) {
      response.status(404).send(error.message);
    }
  }
}

module.exports = SessionController