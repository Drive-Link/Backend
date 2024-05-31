const { drivers } = require('../../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const CreateAndSaveDriver = async function ({ email, phoneNumber, password = 'o', city, country, state }) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log(drivers)
  return { message: 'okay' }
}

module.exports = CreateAndSaveDriver
