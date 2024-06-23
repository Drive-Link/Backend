// handlers/uploadHandler.js
const jwt = require('jsonwebtoken')
const { passengers, driver } = require('../models')
const cloudinary = require('../config/cloudinary')

/**
 * @param {request, response}
 */

const storeFiles = async (request, response) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const { email } = jwt.decode(token)
    const role = request.params.role

    let userProfile
    if (role === 'passenger') {
      const userPassenger = await passengers.findOne({ where: { email } })

      userProfile = await userPassenger.getProfile()
      userProfile.profilePicture = `http://localhost:3000/${request.files.profilePicture[0].path}`
      await userProfile.save()

      return response.status(200).json({
        message: 'profile picture uploaded successfully',
        profilePicture: `http://localhost:3000/${request.files.profilePicture[0].path}`,
      })
    } else if (role === 'driver') {
      const userDriver = await driver.findOne({ where: { email } })

      userProfile = await userDriver.getDriverProfile()
      userProfile.profilePicture = request.files?.profilePicture?.[0]?.path
      await userProfile.save()

      const picture = (value) => {
        return request.files?.[value]?.[0]?.path
      }

      const result = await Promise.all([
        userProfile.createIdentificationCard({
          identificationCardBack: picture('identificationCardBack'),
          identificationCardFront: picture('identificationCardFront'),
        }),
        userProfile.createMedicalReport({
          documentFile: picture('medicalReport'),
        }),
        userProfile.createDriverLicense({
          pictureFront: picture('driverLicenceFront'),
          pictureBack: picture('driverLicenceBack'),
        }),
      ])
      console.log(result)
      return response.status(200).json({ message: 'Profile updated' })
    } else {
      return response.status(400).json({ message: 'No file uploaded or file not meet criteria' })
    }
  } catch (error) {
    // console.log(error)
    response.status(400).json({
      message: 'User details lready exists',
      status: false,
    })
  }
}

module.exports = storeFiles
