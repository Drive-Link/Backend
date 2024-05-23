const db = require('../../models')
const bcrypt = require('bcryptjs')

const passangerSchema = require('../../../schemas/passangerSchema')

const SavePassanger = async function ({
  firstName,
  phoneNumber,
  shortBio,
  city,
  lastName,
  state,
  password,
  country,
  email,
}) {
  await passangerSchema.validateAsync({ firstName, lastName, phoneNumber, password, email })

  const salt = await bcrypt.genSalt(11)
  const passwordHashed = await bcrypt.hash(password, salt)

  return await db.passengers.create({
    firstName,
    lastName,
    state,
    email,
    phoneNumber,
    passwordHashed,
    city,
    shortBio,
    country,
  })
}

const LoginPassengers = async function ({ email = '', phoneNumber = '', password }) {}

module.exports = { SavePassanger, LoginPassengers }
