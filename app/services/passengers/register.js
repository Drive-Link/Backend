const { passengers, driver } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passangerSchema = require('../../../schemas/passangerSchema')

const SavePassanger = async function ({ firstName, phoneNumber, city, lastName, state, password, country, email }) {
  // Validate input
  await passangerSchema.validateAsync({ firstName, lastName, phoneNumber, password, email })

  // Create passenger
  const result = await passengers.create({
    firstName,
    lastName,
    state,
    email,
    phoneNumber,
    hash: await bcrypt.hash(password, bcrypt.genSaltSync(10)),
    city,
    country,
  })

  return result
}

module.exports = { SavePassanger }
