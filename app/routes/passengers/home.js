const express = require('express')
const router = express.Router()
const { passengers, driver } = require('../../models')
const { Op } = require('sequelize')
const auths = require('../../middleware/auths')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const { userId: id, email } = jwt.decode(token)

    const userPassenger = await passengers.findOne({
      where: { email },
      attributes: ['lastName', 'firstName', 'city', 'state', 'id'],
    })

    const driverNearby = await driver.findAll({
      where: { city: userPassenger.city },
      attributes: ['lastName', 'firstName', 'city', 'state', 'id'],
    })

    console.log(driverNearby.__proto__)
    const userPassengerProfile = await userPassenger.getProfile({ attributes: ['isVerified', 'profilePicture', 'id'] })

    response.status(200).json({ message: 'OK', data: { user: userPassenger, driverNearby }, status: true })
  } catch (err) {
    console.log(err)
    response.status(403).json({ message: err.message, status: false })
  }
})

module.exports = router
