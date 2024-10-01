const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auths')
const personalDetails = require('../../controllers/passengers/personalDetails')

router.get('/:getDetails', auth.verifyPassenger, personalDetails.GetPassengerPersonalDetails)

router.post('/:newDetails', auth.verifyPassenger, personalDetails.CreatePersonalDetails)

router.delete('/:deleteDetails', auth.verifyPassenger, personalDetails.DeletePersonalDetails)

router.put('/:updateDetails', auth.verifyPassenger, personalDetails.UpdatePersonalDetails)

module.exports = router
