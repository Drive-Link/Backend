const jwt = require('jsonwebtoken')
const { passengers, driver } = require('../models')
const cloudinary = require('../config/cloudinary')

/**
 * @param {request} request
 * @param {response}
 * store file locally and online
 */

const storeFiles = async (request, response) => {
  // #swagger.description = 'For both passenger and driver file uploads.'
  try {
    /* 
    #swagger.tags = ['passenger', 'driver]

    #swagger.security = [{
        "apiKeyAuth": []
    }] 
    */
    const token = request.headers.authorization.split(' ')[1]
    const { email } = jwt.decode(token)
    const role = request.params.role

    if (!email || !role) {
      return response.status(400).json({ message: 'Invalid token or role' })
    }

    const storeLocally = process.env.STORE_LOCALLY === 'true'

    const uploadToCloudinary = async (filePath) => {
      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'user_profiles',
        })
        return result.secure_url
      } catch (error) {
        throw new Error('Error uploading to Cloudinary')
      }
    }

    const saveFile = async (filePath) => {
      if (storeLocally) {
        return `http://localhost:4000/${filePath}`
      } else {
        return await uploadToCloudinary(filePath)
      }
    }

    let userProfile

    if (role === 'passenger') {
      const userPassenger = await passengers.findOne({ where: { email } })
      if (!userPassenger) {
        return response.status(404).json({ message: 'Passenger not found' })
      }

      userProfile = await userPassenger.getProfile()
      const profilePicturePath = request.files?.profilePicture?.[0]?.path
      userProfile.profilePicture = await saveFile(profilePicturePath)
      await userProfile.save()

      return response.status(200).json({
        message: 'Profile picture uploaded successfully',
        profilePicture: userProfile.profilePicture,
      })
    } else if (role === 'driver') {
      const userDriver = await driver.findOne({ where: { email } })
      if (!userDriver) {
        return response.status(404).json({ message: 'Driver not found' })
      }

      userProfile = await userDriver.getDriverProfile()
      const profilePicturePath = request.files?.profilePicture?.[0]?.path
      userProfile.profilePicture = await saveFile(profilePicturePath)
      await userProfile.save()

      const uploadFiles = async (files) => {
        const results = {}
        for (const key in files) {
          if (files[key]) {
            results[key] = await saveFile(files[key][0].path)
          }
        }
        return results
      }

      const filesToUpload = {
        identificationCardBack: request.files.identificationCardBack,
        identificationCardFront: request.files.identificationCardFront,
        medicalReport: request.files.medicalReport,
        driverLicenceFront: request.files.driverLicenceFront,
        driverLicenceBack: request.files.driverLicenceBack,
      }

      const uploadedFiles = await uploadFiles(filesToUpload)

      await Promise.all([
        userProfile.createIdentificationCard({
          identificationCardBack: uploadedFiles.identificationCardBack,
          identificationCardFront: uploadedFiles.identificationCardFront,
        }),
        userProfile.createMedicalReport({
          documentFile: uploadedFiles.medicalReport,
        }),
        userProfile.createDriverLicense({
          pictureFront: uploadedFiles.driverLicenceFront,
          pictureBack: uploadedFiles.driverLicenceBack,
        }),
      ])

      return response.status(200).json({ message: 'Profile updated successfully' })
    } else {
      return response.status(400).json({ message: 'Invalid role specified' })
    }
  } catch (error) {
    console.log(error.message)
    return response.status(400).json({
      message: '',
      status: false,
    })
  }
}

const patchFiles = async (request, response) => {
  try {
    console.log(request.files)
    return response.status(200).json({ message: 'Patch files', status: true })
  } catch (error) {
    return response.status(400).json({ message: 'Failed to upload file', status: false })
  }
}

module.exports = { storeFiles, patchFiles }
