const express = require('express')
const router = express.Router()

const { LoginDriver } = require('../../controllers/drivers/login')

router.post('/', LoginDriver)

module.exports = router
