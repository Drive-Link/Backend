const { SavePassanger } = require('../../services/passengers/register')
const jwt = require('jsonwebtoken')
const mailing = require('../../config/emailing')

const CreatePassanger = async function (request, response) {
  /* 
    #swagger.tags = ['passenger']
  */

  /*  #swagger.requestBody = {
            required: true,
            in: 'body',
            description: 'Route for register',
            schema: {
                $ref: '#/definitions/passengers'
            }
    } */

  const { firstName, lastName, password, phoneNumber, email, country, city, state, lat_coordinate, lon_coordinate } = request.body

  try {
    const {
      email: passengersEmail,
      id: userId,
      role = 'passenger',
    } = (
      await SavePassanger({
        firstName,
        city,
        phoneNumber,
        lastName,
        country,
        state,
        password,
        email,
        lat_coordinate, lon_coordinate
      })
    ).toJSON()

    const access_token = jwt.sign({ scope: 'identity_update', email, userId, role }, process.env.SECRET_KEY, {
      expiresIn: '10h',
    })

    await mailing({ to: email, subject: 'Register', templateName: 'welcome.ejs', data: { firstName } })

    response
      .status(201)
      .json({ status: true, message: 'passengers created!', data: { user: { userId, email, role } }, access_token })
  } catch (err) {
    console.log(err)
    let message = err.details?.[0].message || err?.errors?.[0].message
    if (message) {
      message = message.replaceAll('"', '')
    }
    const hint = message.includes('unique')
      ? response.status(400).json({ status: false, message: 'phoneNumber or email taken' })
      : response.status(400).json({ status: false, message })

    return hint
  }
}

module.exports = CreatePassanger
