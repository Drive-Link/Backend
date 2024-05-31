const { LoginDriverIn } = require('../../services/drivers/login')
const CreateAndSaveDriver = require('../../services/drivers/register')

const CreateDriver = async (request, response) => {
  // TODO - create drivers
  try {
    const { email, city, country, state, phoneNumber } = request.body
    const result = await CreateAndSaveDriver({ email, phoneNumber, city })
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
