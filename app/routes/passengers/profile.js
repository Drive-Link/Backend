const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/auths')
const { GetPassengerProfile, CreateProfile } = require('../../controllers/passengers/profile')

// Get passenger profile
router.get('/', checkAuth, GetPassengerProfile)

// Create passenger profile
router.post('/', checkAuth, CreateProfile)

module.exports = router
