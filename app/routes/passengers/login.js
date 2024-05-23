const express = require('express')

const { LoginPassengerIn } = require('../../controllers/passengerAuths')

const router = express.Router()

router.post('/', LoginPassengerIn)

module.exports = router
