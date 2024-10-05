const CreateAndSaveDriver = require('../../services/drivers/register')

const CreateDriver = async (request, response) => {
  /* 
    #swagger.tags = ['driver']

    #swagger.security = [{
        "apiKeyAuth": []
    }] 
  */
  /*  
  #swagger.requestBody = {
            required: true,
            in: 'body',
            description: 'Route for register',
            schema: {
                $ref: '#/definitions/drivers'
        }
    } */
  try {
    const { email, city, country, state, shortBio, password, phoneNumber, lastName, firstName } = request.body
    const { id: userId } = await CreateAndSaveDriver({
      email,
      phoneNumber,
      password,
      shortBio,
      country,
      state,
      lastName,
      firstName,
      city,
    })

    response.status(200).json({
      message: 'Account created intiated. Head to profile endpoint to create your profile',
      data: { user: { userId, email, state, city } },
      status: true,
    })
  } catch (error) {
    let message = error.details?.[0].message || error?.errors?.[0].message
    message = message.replaceAll('"', '')

    const hint = message.includes('unique')
      ? response.status(401).json({ status: false, message: 'Phonenumber or email taken' })
      : response.status(401).json({ status: false, message })
    return hint
  }
}
module.exports = CreateDriver
