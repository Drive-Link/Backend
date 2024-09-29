const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auths')
const driverProfile = require('../../controllers/drivers/profile')

router.post('/', auth.verifyDriver, driverProfile.CreateDriverProfile)

router.get('/', auth.verifyDriver, driverProfile.GetDriverProfile)

module.exports = router
