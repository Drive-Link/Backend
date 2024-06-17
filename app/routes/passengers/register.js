const express = require('express')

const CreatePassanger = require('../../controllers/passengers/createPassenger')

const router = express.Router()

router.post('/', CreatePassanger)

module.exports = router
