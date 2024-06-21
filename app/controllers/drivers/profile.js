const jwt = require('jsonwebtoken')
const { driver } = require('../../models')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  },
})

const upload = multer({ storage })

module.exports = {
  CreateDriverProfile: async (request, response) => {
    try {
      const { accounDetails } = request.body
      const email = 'any'

      response.status(201).json({ message: 'driver profile created successfully!' })
    } catch (err) {
      response.status(400).json({ message: err.message })
    }
  },
  GetDriverProfile: async (request, response) => {
    try {
      const email = 'any'
      const userDriver = await driver.findOne({ where: { email } })
      const userDriverProfile = await userDriver.getDriverProfile()
      console.info(await userDriverProfile.getAccountDetails())
      response.status(200).json({ message: 'driver profile' })
    } catch (err) {
      console.log(err)
      response.status(400).json({ message: err.message })
    }
  },
}
