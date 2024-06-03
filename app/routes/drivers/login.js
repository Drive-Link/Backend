const express = require('express')
const router = express.Router()

const { LoginDriver } = require('../../controllers/drivers/driverAuths')

router.post('/', LoginDriver)

module.exports = router
