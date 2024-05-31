const express = require('express')
const router = express.Router()
const { CreateDriver } = require('../../controllers/drivers/driverAuths')

router.post('/', CreateDriver)

module.exports = router
