const express = require('express')
const router = express.Router()
const { passengers } = require('../../models')
const jwt = require('jsonwebtoken')

router.get('/:getDetails', async (request, response) => {
  try {
    const { getDetails } = request.params
    // const token = request.headers.authorization.split(' ')[1]
    const email = 'any'

    // Fetch the userPassenger and userPassengerProfile once, as they are used in all branches
    const userPassenger = await passengers.findOne({ where: { email }, attributes: ['id'] })
    if (!userPassenger) {
      return response.status(404).json({
        status: 'error',
        message: 'Passenger not found',
        data: null,
      })
    }

    const userPassengerProfile = await userPassenger.getProfile()

    let data
    switch (getDetails) {
      case 'car':
        const passengerCar = await userPassengerProfile.getCars({
          attributes: ['carBrand', 'carName', 'type', 'plateNumber'],
        })
        data = { passengerCar }
        break
      case 'card':
        const passengerCard = await userPassengerProfile.getCard({ attributes: ['cardNumber', 'cvv', 'expiryDate'] })
        data = { passengerCard }
        break
      default:
        const passengerTrustedBuddies = await userPassengerProfile.getTrustedbuddies({
          attributes: ['email', 'name', 'phoneNumber'],
        })
        data = { passengerTrustedBuddies }
        break
    }

    response.status(200).json({
      message: 'Request processed successfully',
      data,
      status: true,
    })
  } catch (err) {
    response.status(400).json({
      status: 'error',
      message: 'An error occurred while processing your request',
      error: err.message,
    })
  }
})

router.post('/:newDetails', async (request, response) => {
  try {
    const { newDetails } = request.params
    // const token = request.headers.authorization.split(' ')[1]
    const email = 'any'

    // Fetch the userPassenger and userPassengerProfile once, as they are used in all branches
    const userPassenger = await passengers.findOne({ where: { email }, attributes: ['id'] })
    if (!userPassenger) {
      return response.status(404).json({
        status: 'error',
        message: 'Passenger not found',
        data: null,
      })
      let data
      switch (newDetails) {
        case 'car':
          const passengerCar = await userPassengerProfile.getCars({ attributes: ['carBrand'] })
          data = { passengerCar }
          break
        case 'card':
          const passengerCard = await userPassengerProfile.getCard({ attributes: ['cardNumber'] })
          data = { passengerCard }
          break
        default:
          const passengerTrustedBuddies = await userPassengerProfile.getTrustedbuddies()
          data = { passengerTrustedBuddies }
          break
      }
    }
  } catch (err) {}
})

// router.put('/:getD', async (request, response) => {
//   try {
//     // const {  } = request.body
//     response.status(200).json({ message: 'okay' })
//   } catch (err) {
//     response.status(400).json({ error: err.message })
//   }
// })

router.delete('/:deleteDetails', async (request, response) => {
  try {
    const { deleteDetails } = request.params
    const payload = request.body
    const email = 'any' // This should be dynamically set based on the token or other request data

    const userPassenger = await passengers.findOne({ where: { email } })
    if (!userPassenger) {
      return response.status(404).json({
        status: 'error',
        message: 'Passenger not found',
      })
    }

    const userPassengerProfile = await userPassenger.getProfile()
    if (!userPassengerProfile) {
      return response.status(404).json({
        status: 'error',
        message: 'Passenger profile not found',
      })
    }

    switch (deleteDetails) {
      case 'car':
        const { carName } = payload
        const cars = await userPassengerProfile.getCars({ where: { carName } })
        if (!cars.length) {
          return response.status(404).json({
            status: 'error',
            message: 'Car not found',
          })
        }
        const carToDelete = cars[0]
        await carToDelete.destroy() // Corrected the typo here

        response.status(200).json({
          status: 'success',
          message: 'Car deleted successfully',
        })
        break

      default:
        response.status(400).json({
          status: 'error',
          message: `Deletion of ${deleteDetails} is not supported`,
        })
        break
    }
  } catch (err) {
    response.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request',
      error: err.message,
    })
  }
})

module.exports = router
