const { SavePassanger } = require('../services/passangers/register')

const CreatePassanger = async function (request, response) {
  const { firstName, lastName, password, phoneNumber, email, country, city, state, shortBio } = request.body

  try {
    const access_token = await SavePassanger({
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

    response.status(201).json({ code: 201, access_token })
  } catch (err) {
    const message = err.details?.[0].message || err?.errors?.[0].message

    response.status(422).json({ code: 422, status: 'Bad Request', message })
  }
}

const GetAllUserFromDatabase = async function (request, response) {
  response.status(200).json({ message: 'User not found' })
}

module.exports = { CreatePassanger, GetAllUserFromDatabase }
