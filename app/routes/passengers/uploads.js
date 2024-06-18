// routes/upload.js
const express = require('express')
const router = express.Router()
const cloudinary = require('../../config/cloudinary')
const multer = require('multer')
const { passengers, drivers } = require('../../models')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  },
})

const upload = multer({ storage })

router.post('/', upload.single('file'), async (request, response) => {
  console.log(request.file)
  try {
    const userPassenger = await passengers.findOne({ where: { id: 1 } })
    const userPassengerProfile = await userPassenger.getProfile()
    userPassengerProfile.profilePicture = 'oaplokka'
    await userPassengerProfile.save()
    // console.log(await userPassengerProfile.destroy())

    response.status(201).json({ message: 'Uploaded file successfully' })
  } catch (error) {
    console.error('Upload error:', error) // Log the error
    response.status(500).json({
      message: 'Failed to upload image',
      error: error.message,
    })
  }
})

router.get('/:imagepath', async (request, response) => {
  console.log(request.params)
  // response.status(200).sendFile('../../../uploads/615f770f13f08e03b0cb8322ae786835.jpg')
  response.st
})

module.exports = router
