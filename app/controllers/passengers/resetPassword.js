const { ResetPassword } = require('../../services/passengers/resetPassword')

const ResetPassengersPassword = async function (request, response) {
  /* 
    #swagger.tags = ['passenger']

    #swagger.security = [{
        "apiKeyAuth": []
    }] 
    */
  const { email, phoneNumber = '' } = request.body
  try {
    const result = await ResetPassword({ email, phoneNumber })
    console.log(result)
    response.status(200).json({ message: 'todo' })
  } catch (err) {
    console.log(err)
    response.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = ResetPassengersPassword
