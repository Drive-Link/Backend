const express = require('express')

const { CreatePassanger, GetAllUserFromDatabase } = require('../controllers/passangers')

const router = express.Router()

router.post('/', CreatePassanger)
router.get('/', GetAllUserFromDatabase)

module.exports = router
