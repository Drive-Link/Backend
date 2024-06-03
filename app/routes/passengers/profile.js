const express = require('express')
const router = express.Router()
const { passengers } = require('../../models')
const checkAuth = require('../../middleware/auths')
const jwt = require('jsonwebtoken')

router.get('/', checkAuth, async (request, response) => {
  try {
    const [_, token] = request.headers.authorization.split(' ')

    const { id, email } = jwt.decode(token, process.env.SECRET_KEY)
    console.log(jwt.decode(token, process.env.SECRET_KEY))
    // console.log(customerEmail)

    const profile = await passengers.findOne({
      where: { email },
      attributes: ['email', 'phoneNumber', 'city', 'lastName', 'firstName', 'id'],
    })

    response.status(200).json(profile)
  } catch (error) {
    console.error(error)
    response.status(401).json({ message: 'Unauthorized', status: false })
  }
})

router.post('/', checkAuth, async (request, response) => {})

module.exports = router
