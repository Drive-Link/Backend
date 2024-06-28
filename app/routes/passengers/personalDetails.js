const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auths')
const personalDetails = require('../../controllers/passengers/personalDetails')

// GET route
router.get('/:getDetails', auth, personalDetails.GetPassengerPersonalDetails)

// POST route
router.post('/:newDetails', auth, personalDetails.CreatePersonalDetails)

// DELETE route
router.delete('/:deleteDetails', auth, personalDetails.DeletePersonalDetails)

// PUT route for updating details
router.put('/:updateDetails', auth, personalDetails.UpdatePersonalDetails)

module.exports = router
