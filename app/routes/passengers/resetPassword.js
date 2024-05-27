const express = require('express')
const checkAuth = require('../../middleware/checkAuth')
const { ResetPassengersPassword } = require('../../controllers/passengers/passengerAuths')

const router = express.Router()

router.post('/', checkAuth, ResetPassengersPassword)

module.exports = router
