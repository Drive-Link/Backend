const jwt = require('jsonwebtoken')

const checkAuth = async (request, response, next) => {
  if (!request.headers || !request.headers.authorization) {
    response.status(401).json({ code: 401, status: 'Unauthorized', message: 'Access denied' })
  } else {
    const [bearer, jwtKey] = request.headers.authorization.split(' ')
    const error = jwt.verify(jwtKey, process.env.SECRET_KEY, (error, _) => {
      return error
    })
    if (bearer !== 'Bearer' || error) {
      response.status(401).json({
        code: 401,
        status: 'Unauthorized',
        message: error.message.includes('expired') ? 'Token expired' : 'Invalid token',
      })
    } else {
      next()
    }
  }
}

module.exports = checkAuth
