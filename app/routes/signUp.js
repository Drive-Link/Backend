const express = require('express')
const { CreateUser } = require('../controllers/signUp')

const router = express.Router()

router.post('/', CreateUser)

module.exports = router
