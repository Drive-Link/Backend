const CreateAndSaveDriver = require('../../services/drivers/register')

const CreateDriver = async (request, response) => {
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
    response.status(400).json({ code: 400, status: 'Bad Request', message: error.message })
  }
}
module.exports = CreateDriver
