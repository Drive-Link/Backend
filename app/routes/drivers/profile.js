const express = require('express')
const router = express.Router()
const driveProfile = require('../../controllers/drivers/profile')

router.post('/', driveProfile.CreateDriverProfile)

router.get('/', driveProfile.GetDriverProfile)
 
module.exports = router
