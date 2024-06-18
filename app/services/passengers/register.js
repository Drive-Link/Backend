const { passengers } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passangerSchema = require('../../../schemas/passangerSchema')

const SavePassanger = async function ({ firstName, phoneNumber, city, lastName, state, password, country, email }) {
  // Validate input
  await passangerSchema.validateAsync({ firstName, lastName, phoneNumber, password, email })

  // Generate salt and hash password in parallel
  const saltRounds = 10 // Adjust this value based on your security needs
  const [salt, hash] = await Promise.all([
    bcrypt.genSalt(saltRounds),
    bcrypt.hash(password, bcrypt.genSaltSync(saltRounds)),
  ])

  // Create passenger
  const result = await passengers.create({
    firstName,
    lastName,
    state,
    email,
    phoneNumber,
    hash,
    city,
    country,
  })

  return result
}

module.exports = { SavePassanger }
