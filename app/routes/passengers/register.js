const express = require('express')

const CreatePassanger = require('../../controllers/passengers/register')

const router = express.Router()

router.post('/', CreatePassanger)

module.exports = router
