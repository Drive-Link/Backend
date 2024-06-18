const { LoginDriverIn } = require('../../services/drivers/login')
const CreateAndSaveDriver = require('../../services/drivers/register')

// TODO - create drivers
const CreateDriver = async (request, response) => {
  try {
    const { email, city, country, state, shortBio, password, phoneNumber, lastName, firstName } = request.body
    const result = await CreateAndSaveDriver({
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
    console.log(result)

    response.status(200).json({ message: 'okay' })
  } catch (error) {
    response.status(400).json({ code: 400, status: 'Bad Request', message: error.message })
  }
}

const LoginDriver = async (request, response) => {
  // TODO - login drivers
  try {
    const { email, phoneNumber, password } = request.body
  } catch (error) {
    console.log(error)
    response.status(401).json({ error })
  }
}

module.exports = { CreateDriver, LoginDriver }
