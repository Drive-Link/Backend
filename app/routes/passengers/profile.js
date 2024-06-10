const express = require('express')
const router = express.Router()
const { passengers } = require('../../models')
const generateToken = require('../../utils/generateReferralCode')
const checkAuth = require('../../middleware/auths')
const jwt = require('jsonwebtoken')

router.get('/', checkAuth, async (request, response) => {
  try {
    const [_, token] = request.headers.authorization.split(' ')

    const { id, email } = jwt.decode(token, process.env.SECRET_KEY)

    const userPassenger = await passengers.findOne({
      where: { email },
      attributes: ['email', 'phoneNumber', 'city', 'lastName', 'firstName', 'id'],
    })

    response.status(200).json(await userPassenger.getProfile())
  } catch (error) {
    console.error(error)
    response.status(401).json({ message: 'Unauthorized', status: false })
  }
})

router.post('/', checkAuth, async (request, response) => {
  try {
    const { Cars, TrustedBuddies, Card, shortBio } = request.body

    const { userId } = jwt.decode(request.headers.authorization.split(' ')[1])
    const passenger = await passengers.findOne({ where: { id: userId } })

    const passengerProfile = await passenger.createProfile({
      role: 'passenger',
      shortBio,
      referralCode: generateToken(7),
    })

    // const passengerProfile = await passenger.getProfile({ where: { role: 'passenger' } })
    // console.log(passengerProfile)

    Cars.forEach((car) => {
      passengerProfile.createCar(car)
    })

    TrustedBuddies.forEach((buddies) => {
      passengerProfile.createTrustedbuddy(buddies)
    })

    Card.forEach((card) => {
      passengerProfile.createCard(card)
    })

    // const carGet = await passengerProfile.createCar()
    // carGet.destroy(carGet)

    response.status(201).json({ message: 'profile created!' })
  } catch (err) {
    console.log(err)
    response.status(400).json({ message: '', status: false })
  }
})

module.exports = router
