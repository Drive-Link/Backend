const jwt = require('jsonwebtoken')

module.exports = async function (request, response, next) {
  if (!request.headers || !request.headers.authorization) {
    response.status(401).json({ message: 'Access denied, jwt token required!', status: false })
  } else {
    const [bearer, jwtKey] = request.headers.authorization.split(' ')
    const error = jwt.verify(jwtKey, process.env.SECRET_KEY, (error, _) => {
      return error
    })
    if (bearer !== 'Bearer' || error) {
      response.status(401).json({
        message: error.message.includes('expired') ? 'Token expired' : 'Invalid token',
        status: false,
      })
    } else {
      next()
    }
  }
}
