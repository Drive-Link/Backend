const { LoginPassenger } = require('../../services/passengers/login')

const LoginPassengerIn = async function (request, response) {
  /* 
        #swagger.tags = ['passenger']

        #swagger.requestBody = {
        required: true,
        in: 'body',
        description: 'Get passenger profile',
        schema: {
            $ref: '#/definitions/login'
        }
        }
    */
  const { email, password } = request.body
  try {
    const result = await LoginPassenger({ email, password })

    response.status(200).json(result)
  } catch (err) {
    response.status(401).json({ code: 401, status: 'Unauthorized', message: 'Invalid email or password' })
  }
}

module.exports = LoginPassengerIn
