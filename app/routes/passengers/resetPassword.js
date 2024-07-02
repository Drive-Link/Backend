const express = require('express')
const checkAuth = require('../../middleware/auths')
const ResetPassengersPassword = require('../../controllers/passengers/resetPassword')

const router = express.Router()

router.post('/', checkAuth, ResetPassengersPassword)

module.exports = router
