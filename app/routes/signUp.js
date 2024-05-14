const express = require('express')

const { CreateUser, GetAllUserFromDatabase } = require('../controllers/signUp')

const router = express.Router()

router.post('/', CreateUser)
router.get('/', GetAllUserFromDatabase)

module.exports = router
