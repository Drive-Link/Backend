const jwt = require('jsonwebtoken')

const checkAuth = async (request, response, next) => {
  const authorization = request.headers.authorization
  if (!authorization) {
    response.status(401).json({ code: 401, message: 'apiKey not found' })
  } else {
    const [bearerWord, token] = request.headers.authorization.split(' ')
    if (bearerWord !== 'Bearer') {
      response.status(401).json({ message: 'apiKey not found' })
    } else {
      const error = jwt.verify(token, process.env.SECRET_KEY, (error, _) => {
        return error
      })
      if (error) {
        response.status(401).json({ message: error.message })
      } else {
        next()
      }
    }
  }
}

module.exports = checkAuth
