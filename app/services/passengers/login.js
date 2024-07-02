const { passengers } = require('../../models')
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
  const userPassenger = await passengers.findOne({
    where: { email },
    attributes: ['hash', 'email', 'city', 'phoneNumber', 'id'],
  })
  const { hash, email: customer_email, phoneNumber, city, id: userId } = userPassenger.toJSON()

  const expiresIn = '90d'

  // check password
  if (await bcrypt.compare(password, hash)) {
    const payload = { userId, email, phoneNumber, role: 'passenger' }
    const accessToken = jwt.sign({ role: 'passenger', email, userId, phoneNumber, city }, process.env.SECRET_KEY, {
      expiresIn,
    })

    return {
      message: 'Login Successful',
      data: {
        user: { ...payload, accessToken },
      },
      status: true,
    }
  } else {
    throw new Error('Invalid password or email')
  }
}

module.exports = { LoginPassenger }
