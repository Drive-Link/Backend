const express = require('express')
const { ResetPassengersPassword } = require('../../controllers/passengerAuths')

const router = express.Router()

router.post('/', ResetPassengersPassword)

module.exports = router
