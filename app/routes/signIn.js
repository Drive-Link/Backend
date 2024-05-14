const express = require('express')
const { SignInUser } = require('../controllers/signIn')

const router = express.Router()

router.post('/', SignInUser)

module.exports = router
