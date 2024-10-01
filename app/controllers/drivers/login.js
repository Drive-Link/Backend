const LoginDriverIn = require('../../services/drivers/login')

const LoginDriver = async (request, response) => {
  try {
    /* 
    #swagger.tags = ['driver']
    
    #swagger.requestBody = {
        required: true,
        in: 'body',
        description: 'Login driver',
        schema: {
            $ref: '#/definitions/login'
        }
        }
    }
  */

    const { email, password } = request.body
    const result = await LoginDriverIn({ email, password })
    return response.status(200).json({ result })
  } catch (error) {
    console.log(error)
    return response.status(401).json({ status: false, messqge: 'Invalid email or password' })
  }
}

module.exports = { LoginDriver }
