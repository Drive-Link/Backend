const express = require('express')
const db = require('../../models')
const { sequelize } = require('../../models')
const auth = require('../../middleware/auths')

const router = express.Router()

router.get('/api/v1/admin/@all', auth.verifyAdmin, async (request, response) => {
  try {
    const { user } = request.query
    if (user === 'passengers') {
      const data = await db.passengers.findAll({ attributes: { exclude: ['hash'] }, limit: 10 })
      return response.status(200).json({ user, all: data })
    } else {
      const data = await db.driver.findAll({
        attributes: { exclude: ['hash'] },
        limit: 10,
        include: [{ model: db.driverProfile, attributes: ['id', 'isVerified'] }],
      })
      return response.status(200).json({ status: true, message: `All `, user, all: data })
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
    response.status(400).json({ message: '' })
  }
})

router.put('/api/v1/admin/validate-driver-details', auth.verifyAdmin, async (request, response) => {
  /* 
    #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            isVerified: { type: 'boolean' },
            email: { type: 'string' },
          },
          required: ['isVerified', 'email'],
        },
      },
    },
    }
  
  */
  try {
    const { isVerified, email } = request.body

    const driverInfo = await db.driver.findOne({
      where: { email },
      include: [{ model: db.driverProfile }],
    })

    if (!driverInfo) {
      return response.status(404).json({ message: 'Driver not found', status: false })
    }

    await driverInfo?.driverProfile.update({ isVerified: String(isVerified) })

    response.status(200).json({ status: true, message: `Driver details ${isVerified}` })
  } catch (err) {
    console.log(err)
    response.status(400).json({ message: err.message })
  }
})

router.get('/fetch-by-id/:role/:id', auth.verifyAdmin, async (request, response) => {
  try {
    const { id, role } = request.params
    if (role === 'passenger') {
      const passenger = await db.passengers.findByPk(id, {
        attributes: { exclude: ['hash'] },
        include: [{ model: db.profile }],
      })

      if (!passenger) {
        return response.status(404).json({ message: 'Passenger not found', status: false })
      }
      return response.status(200).json({ status: true, message: 'Passenger details', passenger })
    }

    const driver = await db.driver.findByPk(id, {
      attributes: { exclude: ['hash'] },
      include: [
        {
          model: db.driverProfile,
          attributes: ['id', 'isVerified'],
          include: [{ model: db.identificationCard }, { model: db.driverLicense }, { model: db.medicalReport }],
        },
      ],
    })

    if (!driver) {
      return response.status(404).json({ message: 'Driver not found', status: false })
    }

    return response.status(200).json({ status: true, message: 'Driver details', driver })
  } catch (err) {
    console.log(err)
    response.status(400).json({ message: err.message })
  }
})

router.get('/api/v1/admin/dashboard', auth.verifyAdmin, async (req, res) => {
  try {
    const passengers = await db.passengers.count()
    const drivers = await db.driver.count()

    const { count: unVerifiedUsersCount, rows: unVerifiedUsers } = await db.driverProfile.findAndCountAll({
      where: { isVerified: 'false' },
      attributes: { exclude: ['hash'] },
      include: [{ model: db.driver }],
    })

    const { count: declinedUserCount, rows: declinedUsers } = await db.driverProfile.findAndCountAll({
      where: { isVerified: 'decline' },
      attributes: { exclude: ['hash'] },
      include: [{ model: db.driver }],
    })

    res.status(200).json({
      status: true,
      message: 'Dashboard',
      data: {
        passengers,
        drivers,
        unVerifiedDriverCountAndUser: { unVerifiedUsersCount, unVerifiedUsers },
        declinedDriverCountAndUser: { declinedUserCount, declinedUsers },
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: false, message: 'Error fetching data' })
  }
})

module.exports = router
