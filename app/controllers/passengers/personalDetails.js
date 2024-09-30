const { Op } = require('sequelize')
const { passengers } = require('../../models')

const jwt = require('jsonwebtoken')

module.exports = {
  GetPassengerPersonalDetails: async (request, response) => {
    /* 
    #swagger.tags = ['passenger']

    #swagger.security = [{
        passengerAuth: []
    }] 
    */
    try {
      const { getDetails } = request.params
      const token = request.headers.authorization.split(' ')[1]
      const { email } = jwt.decode(token)

      const userPassenger = await passengers.findOne({ where: { email }, attributes: ['id'] })
      if (!userPassenger) {
        return response.status(404).json({
          status: 'error',
          message: 'Passenger not found',
          data: null,
        })
      }

      const userPassengerProfile = await userPassenger.getProfile()
      if (!userPassengerProfile) {
        return response.status(404).json({
          status: 'error',
          message: 'Passenger profile not found',
          data: null,
        })
      }

      let data
      switch (getDetails) {
        case 'car':
          data = await userPassengerProfile.getCars({
            attributes: ['carBrand', 'carName', 'type', 'plateNumber'],
          })
          break
        case 'card':
          data = await userPassengerProfile.getCard({
            attributes: ['cardNumber', 'cvv', 'expiryDate'],
          })
          break
        default:
          data = await userPassengerProfile.getTrustedbuddies({
            attributes: ['email', 'name', 'phoneNumber'],
          })
          break
      }

      response.status(200).json({
        message: 'Request processed successfully',
        data,
        status: true,
      })
    } catch (err) {
      response.status(500).json({
        status: 'error',
        message: 'An error occurred while processing your request',
        error: err.message,
      })
    }
  },



  CreatePersonalDetails: async (request, response) => {
    try {
      //
      const { newDetails } = request.params
      const { cars, card, trustedbuddies } = request.body

      const token = request.headers.authorization.split(' ')[1]
      const { email } = jwt.decode(token)

      const userPassenger = await passengers.findOne({ where: { email }, attributes: ['id'] })
      if (!userPassenger) {
        return response.status(404).json({
          status: 'error',
          message: 'Passenger not found',
          data: null,
        })
      }

      const userPassengerProfile = await userPassenger.getProfile()
      if (!userPassengerProfile) {
        return response.status(404).json({
          status: 'error',
          message: 'Passenger profile not found',
          data: null,
        })
      }

      switch (newDetails) {
        case 'car':
          await Promise.all(cars.map((car) => userPassengerProfile.createCar(car)))
          response.status(200).json({ message: 'Passenger car saved successfully', status: true })
          break
        case 'card':
          if (await userPassengerProfile.getCard()) {
            response.status(400).json({ message: 'Already have a card!', status: false })
          } else {
            await userPassengerProfile.createCard(card)
            response.status(200).json({ message: 'Passenger card saved successfully', status: true })
          }
          break
        default:
          const existingBuddy = await userPassengerProfile.getTrustedbuddies({
            where: { email: trustedbuddies[0].email },
          })
          if (existingBuddy.length) {
            response.status(400).json({ message: 'Buddy already exists', status: false })
          } else {
            await Promise.all(trustedbuddies.map((buddy) => userPassengerProfile.createTrustedbuddy(buddy)))
            response.status(200).json({ message: 'Trusted buddy saved successfully', status: true })
          }
          break
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        status: 'error',
        message: 'An error occurred while processing your request',
        error: err.message,
      })
    }
  },










  DeletePersonalDetails: async (request, response) => {
    try {
      const { deleteDetails } = request.params
      const { carName, name } = request.body
      // const email = 'any'
      const token = request.headers.authorization.split(' ')[1]
      const { email } = jwt.decode(token)

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
          const cars = await userPassengerProfile.getCars({ where: { carName } })
          if (!cars.length) {
            return response.status(404).json({
              status: 'error',
              message: 'Car not found',
            })
          }
          await cars[0].destroy()
          response.status(200).json({
            status: 'success',
            message: 'Car deleted successfully',
          })
          break
        case 'card':
          const card = await userPassengerProfile.getCard()
          if (!card) {
            return response.status(404).json({ message: 'Card not found', status: false })
          }
          await card.destroy()
          response.status(200).json({ message: 'Card deleted successfully', status: true })
          break
        case 'trustedbuddies':
          const buddies = await userPassengerProfile.getTrustedbuddies({ where: { name: { [Op.like]: `%${name}%` } } })
          if (!buddies.length) {
            return response.status(404).json({ message: 'Trusted buddy not found', status: false })
          }
          await Promise.all(buddies.map((buddy) => buddy.destroy()))
          response.status(200).json({ message: 'Trusted buddy deleted successfully', status: true })
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
  },



  
  UpdatePersonalDetails: async (request, response) => {
    try {
      const { updateDetails } = request.params
      const { cars, card, trustedbuddies } = request.body
      const token = request.headers.authorization.split(' ')[1]
      const { email } = jwt.decode(token)

      const userPassenger = await passengers.findOne({ where: { email }, attributes: ['id'] })
      if (!userPassenger) {
        return response.status(404).json({
          status: 'error',
          message: 'Passenger not found',
          data: null,
        })
      }

      const userPassengerProfile = await userPassenger.getProfile()
      if (!userPassengerProfile) {
        return response.status(404).json({
          status: 'error',
          message: 'Passenger profile not found',
          data: null,
        })
      }

      switch (updateDetails) {
        case 'car':
          await Promise.all(
            cars.map(async (car) => {
              const existingCar = await userPassengerProfile.getCars({ where: { carName: car.carName } })
              if (existingCar.length) {
                await existingCar[0].update(car)
              }
            }),
          )
          response.status(200).json({ message: 'Passenger car updated successfully', status: true })
          break
        case 'card':
          const existingCard = await userPassengerProfile.getCard()
          if (existingCard) {
            await existingCard.update(card)
            response.status(200).json({ message: 'Passenger card updated successfully', status: true })
          } else {
            response.status(404).json({ message: 'Card not found', status: false })
          }
          break
        default:
          await Promise.all(
            trustedbuddies.map(async (buddy) => {
              const existingBuddy = await userPassengerProfile.getTrustedbuddies({ where: { email: buddy.email } })
              if (existingBuddy.length) {
                await existingBuddy[0].update(buddy)
              }
            }),
          )
          response.status(200).json({ message: 'Trusted buddy updated successfully', status: true })
          break
      }
    } catch (err) {
      response.status(500).json({
        status: 'error',
        message: 'An error occurred while processing your request',
        error: err.message,
      })
    }
  },
}
