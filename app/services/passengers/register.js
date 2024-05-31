const { passengers } = require('../../models')
const bcrypt = require('bcryptjs')
const generateReferralCode = require('../../utils/generateReferralCode')
const passangerSchema = require('../../../schemas/passangerSchema')

const SavePassanger = async function ({
  firstName,
  phoneNumber,
  city,
  lastName,
  state,
  password,
  country,
  email,
  shortBio,
}) {
  await passangerSchema.validateAsync({ firstName, lastName, phoneNumber, password, email })

  const salt = await bcrypt.genSalt(11)
  const hash = await bcrypt.hash(password, salt)

  const referralCode = generateReferralCode(7)
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
  console.log(result.__proto__)

  const profileCreation = await result.createProfile({ shortBio, referralCode, role: 'passenger' })
  console.log(profileCreation.toJSON())
  return result
}

module.exports = { SavePassanger }
