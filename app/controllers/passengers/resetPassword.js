const { ResetPassword, ChangePasswordHandler } = require('../../services/passengers/resetPassword')

const ResetPassengersPassword = async function (request, response) {
  /* 
    #swagger.tags = ['passenger']

    #swagger.security = [{
        "apiKeyAuth": []
    }] 
    */
  /*
   #swagger.requestBody = {
    required: true,
    in: 'body',
    description: 'Create passenger profile',
    schema: {
      $ref: '#/definitions/resetPasswordPayload'
    }
   }
   */
  const { email, phoneNumber = '' } = request.body
  try {
    const result = await ResetPassword({ email, phoneNumber })

    response.status(200).json({ message: 'success', result })
  } catch (err) {
    console.log(err)
    response.status(401).json({ message: 'Unauthorized' })
  }
}

const ChangePassword = async function (request, response) {
  /*
   #swagger.requestBody = {
    required: true,
    in: 'body',
    description: 'Update password',
    schema: {
      $ref: '#/definitions/UpdatePasswordPayload'
    }
   }
  */
  const { token, password, confirmPassword } = request.body
  try {
    const result = await ChangePasswordHandler({ token, password, confirmPassword })
    response.status(200).json({ message: 'success', result })
  } catch (err) {
    console.log(err)
    response.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = { ResetPassengersPassword, ChangePassword }
