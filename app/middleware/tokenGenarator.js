const jwt = require('jsonwebtoken')

const Tokengenerator = async function (request, _, next) {
  const { email, city, state } = request.body
  const access_token = jwt.sign({ email, city, state }, process.env.SECRET_KEY, { expiresIn: '1h' })
  return access_token
  next()
}

module.exports = Tokengenerator
