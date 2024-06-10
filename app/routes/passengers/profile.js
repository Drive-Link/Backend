const express = require('express')
const router = express.Router()
const { passengers } = require('../../models')
const generateToken = require('../../utils/generateReferralCode')
const checkAuth = require('../../middleware/auths')
const jwt = require('jsonwebtoken')

// Get passenger profile
router.get('/', checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { email } = jwt.decode(token, process.env.SECRET_KEY)
    const userPassenger = await passengers.findOne({
      where: { email },
      attributes: ['email', 'phoneNumber', 'city', 'lastName', 'firstName', 'id'],
    })
    const profile = await userPassenger.getProfile()
    res.status(200).json(profile)
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: 'Unauthorized', status: false })
  }
})

// Create passenger profile
router.post('/', checkAuth, async (req, res) => {
  try {
    const { Cars, TrustedBuddies, Card, shortBio } = req.body
    const userId = jwt.decode(req.headers.authorization.split(' ')[1]).userId
    const passenger = await passengers.findOne({ where: { id: userId } })
    const profile = await passenger.createProfile({
      role: 'passenger',
      shortBio,
      referralCode: generateToken(7),
    })
    await Promise.all([
      ...Cars.map((car) => profile.createCar(car)),
      ...TrustedBuddies.map((buddy) => profile.createTrustedbuddy(buddy)),
      ...Card.map((card) => profile.createCard(card)),
    ])
    res.status(201).json({ message: 'Profile created!' })
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: 'Failed to create profile', status: false })
  }
})

module.exports = router
