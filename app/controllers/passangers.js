const { SavePassanger } = require('../services/passangers/index')

const CreatePassanger = async function (request, response) {
  const { firstName, lastName, password, phoneNumber, email, country, city, state, shortBoi } = request.body

  try {
    const res = await SavePassanger({
      firstName,
      shortBoi,
      city,
      phoneNumber,
      lastName,
      country,
      state,
      password,
      email,
    })

    response.status(201).send({ code: 201, message: 'Passanger Created' })
  } catch (err) {
    const message = err.errors[0].message

    response.status(400).send({ code: 400, status: 'Bad Request', message })
  }
}

const GetAllUserFromDatabase = async function (request, response) {
  response.status(200).send({ message: 'User not found' })
}

module.exports = { CreatePassanger, GetAllUserFromDatabase }
