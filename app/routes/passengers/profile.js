const express = require('express')
const router = express.Router()
const { passengers } = require('../../models')
const checkAuth = require('../../middleware/auths')
const jwt = require('jsonwebtoken')

router.get('/', checkAuth, async (request, response) => {
  try {
    const [_, token] = request.headers.authorization.split(' ')

    const { id, customerEmail } = jwt.decode(token, process.env.SECRET_KEY)

    const profile = await passengers.findOne({
      where: { email: customerEmail },
      attributes: ['email', 'phoneNumber', 'city', 'lastName', 'firstName', 'id'],
    })
    console.log((await profile.getProfile()).toJSON())

    response.status(200).json(profile)
  } catch (error) {
    console.log(error)
    response.status(401).json({ code: 401, status: 'failed', message: 'Unauthorized' })
  }
})

module.exports = router
