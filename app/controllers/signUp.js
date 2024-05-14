const service = require('../services/signUp/index')

const CreateUser = async function (request, response) {
  response.status(201).send({ message: 'Okay' })
}

const GetAllUserFromDatabase = async function (request, response) {
  response.status(200).send({ message: 'User not found' })
}

module.exports = { CreateUser, GetAllUserFromDatabase }
