const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auths')
const { GetPassengerProfile, CreateProfile } = require('../../controllers/passengers/profile')

// Get passenger profile
router.get('/', auth.verifyPassenger, GetPassengerProfile)

// Create passenger profile
router.post('/', auth.verifyPassenger, CreateProfile)

module.exports = router
