const jwt = require('jsonwebtoken')
const { driver } = require('../../models')

module.exports = {
  CreateDriverProfile: async (request, response) => {
    try {
      const { accounDetails } = request.body
      const { file } = request.files
      const email = 'any'

      response.status(201).json({ message: 'driver profile created successfully!' })
    } catch (err) {
      response.status(400).json({ message: err.message })
    }
  },
  GetDriverProfile: async (request, response) => {
    try {
      const token = request.headers.authorization.split(' ')[1]
      const { email } = jwt.decode(token)
      const userDriver = await driver.findOne({ where: { email } })
      const userDriverProfile = await userDriver.getDriverProfile()

      return response.status(200).json({ message: 'driver profile' })
    } catch (err) {
      console.log(err)
      return response.status(400).json({ message: err.message })
    }
  },
}
