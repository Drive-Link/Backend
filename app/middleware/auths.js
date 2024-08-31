const jwt = require('jsonwebtoken')

module.exports = {
  verifyPassengerAndDriver: function (request, response, next) {
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
  },
  verifyAdmin: function (request, response, next) {
    /* 


    #swagger.security = [{
        adminAuth: []
    }] 
    */
    if (!request.headers || !request.headers.authorization) {
      response.status(401).json({ message: 'Access denied, jwt token required!', status: false })
    } else {
      const [bearer, jwtKey] = request.headers.authorization.split(' ')

      const [error, role] = jwt.verify(jwtKey, process.env.SECRET_KEY, (error, { role }) => {
        return [error, role]
      })
      console.log(role)
      if (bearer !== 'Bearer' || error) {
        response.status(401).json({
          message: error?.message?.includes('expired') ? 'Token expired' : 'Invalid token',
          status: false,
        })
      } else if (role !== 'admin') {
        response.status(401).json({
          message: "You don't access to this resources",
          status: false,
        })
      } else {
        next()
      }
    }
  },
}
