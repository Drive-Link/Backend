const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

  const salt = await bcrypt.genSalt(10)
  const passwordHashed = await bcrypt.hash(password, salt)

  await db.passengers.create({
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
  const access_token = jwt.sign({ email, country }, process.env.SECRET_KEY, { expiresIn: '20m' })
  return access_token
}

const GetAllDriver = async function () {}

module.exports = { SavePassanger }
