const express = require('express')
const router = express.Router()
const db = require('../../models')
const checkAuth = require('../../middleware/checkAuth')
const jwt = require('jsonwebtoken')

router.get('/', checkAuth, async (request, response) => {
  try {
    const [bearer, token] = request.headers.authorization.split(' ')

    const payload = jwt.decode(token, process.env.SECRET_KEY, (error, payload) => {
      return 'k'
    })

    console.log(payload)

    console.log(
      await db.passengers.findOne({
        where: { email: 's' },
        attributes: ['email'],
      }),
    )

    response.status(200).json({ message: '' })
  } catch (err) {
    response.status(401).json({ code: 401, status: 'failed', message: 'Unauthorized' })
  }
})

module.exports = router
