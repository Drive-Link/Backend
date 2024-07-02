const express = require('express')
const router = express.Router()
const CreateDriver = require('../../controllers/drivers/register')

router.post('/', CreateDriver)

module.exports = router
