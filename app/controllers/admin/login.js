const { admins } = require('../../models')
const { Router } = require('express')

const router = Router()

router.post('/admin/', function (request, response) {
  const { email, password } = req.body
  response.status(200).json({ email })
})

module.exports = router
