const { SavePassanger } = require('../services/passengers/register')
const { LoginPassenger } = require('../services/passengers/login')
const { ResetPassword } = require('../services/passengers/resetPassword')

const CreatePassanger = async function (request, response) {
  const { firstName, lastName, password, phoneNumber, email, country, city, state, shortBio } = request.body

  try {
    const resultSavePassenger = await SavePassanger({
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

    response.status(201).json({ code: 201, status: 'success', message: 'Passengers created!' })
  } catch (err) {
    let message = err.details?.[0].message || err?.errors?.[0].message
    message = message.replaceAll('"', '')

    const hint = message.includes('unique') ? 'email or phoneNumber already taken' : 'A parameter was not provided'

    response.status(401).json({ code: 401, status: 'Bad Request', message, hint })
  }
}

const LoginPassengerIn = async function (request, response) {
  const { email = '', password, phoneNumber = '' } = request.body
  try {
    const result = LoginPassenger({ email, phoneNumber, password })

    response.status(200).json(await result)
  } catch (err) {
    response.status(401).json({ code: 401, status: 'Unauthorized', message: 'Invalid email or password' })
  }
}

const ResetPassengersPassword = async function (request, response) {
  const { email } = request.body
  try {
    const result = await ResetPassword({ email })
    console.log(result)
    response.status(200).json({ message: 'tofo' })
  } catch (err) {}
}

module.exports = { CreatePassanger, LoginPassengerIn, ResetPassengersPassword }
