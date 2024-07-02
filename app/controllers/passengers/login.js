const { LoginPassenger } = require('../../services/passengers/login')

const LoginPassengerIn = async function (request, response) {
  /* 
    #swagger.tags = ['passenger']

    #swagger.security = [{
        "bearerAuth": []
    }] 
    */
  const { email, password } = request.body
  try {
    const result = await LoginPassenger({ email, password })
    /* #swagger.responses[200] = {
            description: "Some description...",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/responseLogin"
                    }
                }           
            }
        }   
    */
    response.status(200).json(result)
  } catch (err) {
    console.log(err)
    /* #swagger.responses[401] = {
            description: "Some description...",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/drivers"
                    }
                }           
            }
        }   
    */
    response.status(401).json({ code: 401, status: 'Unauthorized', message: 'Invalid email or password' })
  }
}

module.exports = LoginPassengerIn
