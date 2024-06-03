const { LoginPassenger } = require('../../services/passengers/login')

const LoginPassengerIn = async function (request, response) {
  const { email, password } = request.body
  try {
    const result = await LoginPassenger({ email, password })
    console.log(result)
    response.status(200).json(result)
  } catch (err) {
    console.log(err)
    response.status(401).json({ code: 401, status: 'Unauthorized', message: 'Invalid email or password' })
  }
}

module.exports = LoginPassengerIn