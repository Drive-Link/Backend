const express = require('express')
const router = express.Router()
const checkAuth = require('../../middleware/auths')
const { GetPassengerProfile, CreateProfile } = require('../../controllers/passengers/profile')

// Get passenger profile
router.get('/', checkAuth, GetPassengerProfile)

// Create passenger profile
router.post('/', checkAuth, CreateProfile)

router.patch('/', checkAuth, (request, response) => {
  const { email, password, scope } = request.body
  response.status(200).json({ message: 'okay', status: true })
})

module.exports = router
