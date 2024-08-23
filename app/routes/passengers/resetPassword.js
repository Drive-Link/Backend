const express = require('express')
const checkAuth = require('../../middleware/auths')
const { ResetPassengersPassword, ChangePassword } = require('../../controllers/passengers/resetPassword')

const router = express.Router()

router.post('/', ResetPassengersPassword)
router.put('/', ChangePassword)

module.exports = router
