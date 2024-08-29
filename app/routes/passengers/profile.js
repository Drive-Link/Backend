const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/auths')
const { GetPassengerProfile, CreateProfile } = require('../../controllers/passengers/profile')

// Get passenger profile
router.get('/', checkAuth.verifyPassengerAndDriver, GetPassengerProfile)

// Create passenger profile
router.post('/', checkAuth.verifyPassengerAndDriver, CreateProfile)

module.exports = router
