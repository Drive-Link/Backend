const LoginDriverIn = require('../../services/drivers/login')

const LoginDriver = async (request, response) => {
  // TODO - login drivers
  try {
    const { email, password } = request.body
    const result = await LoginDriverIn({ email, password })
    response.status(200).json({ result })
  } catch (error) {
    console.log(error)
    response.status(401).json({ messqge: 'okay' })
  }
}

module.exports = { LoginDriver }
