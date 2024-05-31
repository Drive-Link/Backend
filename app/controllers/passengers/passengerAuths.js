const { SavePassanger } = require('../../services/passengers/register')
const { LoginPassenger } = require('../../services/passengers/login')
const { ResetPassword } = require('../../services/passengers/resetPassword')

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

    response.status(201).json({ code: 201, status: 'success', message: 'passengers created!' })
  } catch (err) {
    console.log(err)
    let message = err.details?.[0].message || err?.errors?.[0].message
    message = message.replaceAll('"', '')

    const hint = message.includes('unique') ? 'email or phoneNumber already taken' : 'A parameter was not provided'

    response.status(401).json({ code: 401, status: 'Bad Request', message, hint })
  }
}

const LoginPassengerIn = async function (request, response) {
  const { email, password } = request.body
  try {
    const result = await LoginPassenger({ email, password })
    console.log(result)
    response.status(200).json(result)
  } catch (err) {
    response.status(401).json({ code: 401, status: 'Unauthorized', message: 'Invalid email or password' })
  }
}

const ResetPassengersPassword = async function (request, response) {
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

module.exports = { CreatePassanger, LoginPassengerIn, ResetPassengersPassword }
