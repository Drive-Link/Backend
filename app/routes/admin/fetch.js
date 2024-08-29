const express = require('express')
const db = require('../../models')
const { sequelize } = require('../../models')
const auth = require('../../middleware/auths')

const router = express.Router()

router.get('/api/v1/admin/@all', auth.verifyAdmin, async (request, response) => {
  try {
    const { user } = request.query
    if (user === 'passengers') {
      const data = await db.passengers.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'], limit: 10 })
      return response.status(200).json({ user, all: data })
    } else {
      const data = await db.driver.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'], limit: 10 })
      return response.status(200).json({ user, all: data })
    }
  } catch (err) {
    response.status(401).json({ message: 'Invalid request', status: false })
  }
})

router.delete('/api/v1/admin/user/:user', auth.verifyAdmin, async (request, response) => {
  try {
    const { user } = request.params
    const { email } = request.query

    if (user === 'passengers') {
      const passenger = await db.passengers.findOne({ where: { email } })

      if (!passenger) {
        return response.status(404).json({ message: 'Passenger not found', status: false })
      }

      const result = await sequelize.query('DELETE FROM passengers WHERE email = :email', {
        replacements: { email: passenger.email },
        type: sequelize.QueryTypes.DELETE,
      })

      // console.log(passenger.toJSON())

      //   const deletedPassenger = await passenger
      //   console.log(deletedPassenger)

      return response.status(200).json({ message: 'Passenger deleted successfully', status: true })
    } else if (user === 'drivers') {
      const driver = await db.driver.findOne({ where: { email } })
      if (!driver) {
        return response.status(404).json({ message: 'Driver not found', status: false })
      }

      const result = await sequelize.query('DELETE FROM drivers WHERE email = :email', {
        replacements: { email: driver.email },
        type: sequelize.QueryTypes.DELETE,
      })

      return response.status(200).json({ message: 'Driver deleted successfully', staus: true })
    } else {
      response.status(404).json({ message: 'Invalid parameter' })
    }
  } catch (err) {
    console.log(err)
    response.status(500).json({ message: '' })
  }
})

module.exports = router
