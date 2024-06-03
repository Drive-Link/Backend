const { passengers } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passangerSchema = require('../../../schemas/passangerSchema')

const SavePassanger = async function ({ firstName, phoneNumber, city, lastName, state, password, country, email }) {
  await passangerSchema.validateAsync({ firstName, lastName, phoneNumber, password, email })

  const salt = await bcrypt.genSalt(11)
  const hash = await bcrypt.hash(password, salt)

  // const referralCode = generateReferralCode(7)
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
