// handlers/uploadHandler.js
const jwt = require('jsonwebtoken')
const { passengers, driver } = require('../models')
const cloudinary = require('../config/cloudinary')

const storeFiles = async (request, response) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const { email } = jwt.decode(token)
    const role = request.params.role

    // let userProfile
    if (role === 'passenger') {
      const userPassenger = await passengers.findOne({ where: { email } })

      const userProfile = await userPassenger.getProfile()
      userProfile.profilePicture = `http://localhost:3000/${request.files.profilePicture[0].path}`
      await userProfile.save()

      return response.status(200).json({
        message: 'profile picture uploaded successfully',
        profilePicture: `http://localhost:3000/${request.files.profilePicture[0].path}`,
      })
    } else if (role === 'driver') {
      const userDriver = await driver.findOne({ where: { email } })

      const userProfile = await userDriver.getDriverProfile()
      for (const i in request.files) {
        console.log(i)
      }
      return response.status(200).json({ message: '' })
    } else {
      return response.status(400).json({ message: 'No file uploaded or file not meet criteria' })
    }
  } catch (error) {
    console.log('Upload error:', error) // Log the error
    return response.status(400).json({
      message: 'Failed to upload image',
      error: error.message,
    })
  }
}

module.exports = storeFiles
