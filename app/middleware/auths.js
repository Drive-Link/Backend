const jwt = require('jsonwebtoken')

module.exports = {
  verifyPassenger: function (request, response, next) {
    /* 
    #swagger.tags = ['passenger']

    #swagger.security = [{
        "passengerAuth": []
    }] 
    */
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

    #swagger.tags = ['admin']

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
  verifyDriver(request, response, next) {
    /* 

      #swagger.tags = ['driver']
      
      #swagger.security = [{
        driverAuth: []
      }] 
    */
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
}
