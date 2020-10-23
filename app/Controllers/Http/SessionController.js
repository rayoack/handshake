'use strict'

const { validate } = use('Validator')
const Logger = use('Logger');

class SessionController {
  async create ({ request, auth }) {
    const validation = await validate(request.all(), {
      email: 'required|email|min:3|max:255',
      password: 'required'
    })
    
    if (validation.fails()) return validation.messages()

    const { email, password } = request.all()
    Logger.error({email});

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController