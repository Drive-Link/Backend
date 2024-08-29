const express = require('express')
const router = express.Router()
const { passengers, driver } = require('../../models')
const { Op } = require('sequelize')
const auths = require('../../middleware/auths')
const jwt = require('jsonwebtoken')

router.get('/', auths.verifyPassengerAndDriver, async (request, response) => {
  /* 
    #swagger.tags = ['passenger']

    #swagger.security = [{
        "passengerAuth": []
    }] 
    */
  try {
    const token = request.headers.authorization.split(' ')[1]
    const { userId: id, email } = jwt.decode(token)

    const userPassenger = await passengers.findOne({
      where: { email },
      attributes: ['lastName', 'firstName', 'city', 'state', 'id'],
    })

    const driversNearby = Array.from(
      await driver.findAll({
        where: { city: userPassenger.city },
        attributes: ['lastName', 'firstName', 'city', 'state', 'id'],
        include: ['driverProfile'],
      }),
    )
    // console.log(driversNearby)

    for (const driver of driversNearby) {
      console.log(driver.toJSON())
    }
    // const userPassengerProfile = await userPassenger.getProfile({ attributes: ['isVerified', 'profilePicture', 'id'] })
    // console.log(userPassengerProfile)

    return response.status(200).json({ message: 'OK', data: { user: userPassenger, driversNearby }, status: true })
  } catch (err) {
    console.log(err)
    response.status(403).json({ message: err.message, status: false })
  }
})

module.exports = router
