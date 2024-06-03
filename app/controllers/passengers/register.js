const status = require('@adedayomatthews/proxy-manager/src/constants/status')
const { SavePassanger } = require('../../services/passengers/register')
const jwt = require('jsonwebtoken')

const CreatePassanger = async function (request, response) {
  const { firstName, lastName, password, phoneNumber, email, country, city, state, shortBio } = request.body

  try {
    const {
      email: passengersEmail,
      id: userId,
      role = 'passenger',
    } = (
      await SavePassanger({
        firstName,
        shortBio,
        city,
        phoneNumber,
        lastName,
        country,
        state,
        password,
        email,
      })
    ).toJSON()

    const access_token = jwt.sign({ scope: 'identity_update', email, userId, role }, process.env.SECRET_KEY, {
      expiresIn: '10h',
    })

    response
      .status(201)
      .json({ status: true, message: 'passengers created!', data: { user: { userId, email, role } }, access_token })
  } catch (err) {
    let message = err.details?.[0].message || err?.errors?.[0].message
    message = message.replaceAll('"', '')

    const hint = message.includes('unique')
      ? response.status(401).json({ status: false, message, hint })
      : response.status(401).json({ status: false, message })
    // response.status(401).json({ status: false, hint })
    return hint
  }
}

module.exports = CreatePassanger
