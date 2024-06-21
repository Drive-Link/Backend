const { driver } = require('../../models')
const jwt = require('jsonwebtoken')
const referralGenerator = require('../../utils/generateReferralCode')

const bcrypt = require('bcryptjs')

const CreateAndSaveDriver = async ({
  email,
  phoneNumber,
  firstName,
  lastName,
  shortBio,
  password,
  city,
  country,
  state,
}) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const newDriver = await driver.create({
    email,
    firstName,
    lastName,
    phoneNumber,
    shortBio,
    hash,
    city,
    country,
    state,
  })
  await newDriver.createDriverProfile()
  return newDriver.toJSON()
}

module.exports = CreateAndSaveDriver
