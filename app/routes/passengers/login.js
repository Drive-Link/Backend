const express = require('express')

const LoginPassengerIn = require('../../controllers/passengers/login')

const router = express.Router()

router.patch('/', LoginPassengerIn)

module.exports = router
