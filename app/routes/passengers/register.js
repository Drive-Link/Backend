const express = require('express')

const { CreatePassanger } = require('../../controllers/passengers/passengerAuths')

const router = express.Router()

router.post('/', CreatePassanger)

module.exports = router
