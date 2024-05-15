const db = require('../../models')
const bcrypt = require('bcrypt')

const passangerSchema = require('../../../schemas/passangerSchema')

const SavePassanger = async function ({
  firstName,
  phoneNumber,
  shortBoi,
  city,
  lastName,
  state,
  password,
  country,
  email,
}) {
  await passangerSchema.validateAsync({ firstName, lastName, password, email })
  const salt = await bcrypt.genSalt(10)
  const passwordHashed = await bcrypt.hash(password, salt)

  return await db.passengers.create({
    firstName,
    lastName,
    state,
    email,
    phoneNumber,
    passwordHashed,
    city,
    shortBoi,
    country,
  })
}

const GetAllDriver = async function () {}

module.exports = { SavePassanger }
