const { passengers, PassengersProfile } = require('../../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/** Login user in
 *
 * @param {string} email - customer_email
 * @param {string} password - customer_password
 * @param {string} phoneNumber - customer_phoneNumber
 * @returns {Promise<access_token>}  - Auth success or failed
 */

const LoginPassenger = async ({ email, password }) => {
  const profile = await passengers.findOne({
    where: { email },
    attributes: ['hash', 'email', 'city', 'phoneNumber', 'id'],
  })
  console.log((await profile.getProfile()).toJSON())
  const {
    hash,
    email: customerEmail,
    phoneNumber,
    city,
    id: user_id,
  } = (
    await passengers.findOne({
      where: { email },
      attributes: ['hash', 'email', 'city', 'phoneNumber', 'id'],
    })
  ).toJSON()

  const expiresIn = '1d'

  // check password
  if (await bcrypt.compare(password, hash)) {
    const access_token = jwt.sign(
      { role: 'passenger', customerEmail, user_id, phoneNumber, city },
      process.env.SECRET_KEY,
      {
        expiresIn,
      },
    )

    return {
      message: 'Login Successful',
      data: {
        user: { user_id, email, phoneNumber, role: 'passenger', access_token },
      },
      status: 'success',
    }
  } else {
    throw new Error('Invalid password or email')
  }
}

module.exports = { LoginPassenger }
