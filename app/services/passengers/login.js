const db = require('../../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/** Login user in
 *
 * @param {string} email - customer_email
 * @param {string} password - customer_password
 * @param {string} phoneNumber - customer_phoneNumber
 * @returns {Promise<access_token>}  - Auth success or failed
 */

const LoginPassenger = async ({ email = '', phoneNumber = '', password }) => {
  const {
    dataValues: { passwordhashed, email: customerEmail, phoneNumber: customerPhoneNumber, city },
  } = await db.passengers.findOne({
    where: email === '' ? { phoneNumber } : { email },
    attributes: ['passwordhashed', 'email', 'city', 'phoneNumber'],
  })

  const expiresIn = '1d'

  // check password
  if (await bcrypt.compare(password, passwordhashed)) {
    const access_token = jwt.sign(
      { role: 'passenger', customerEmail, customerPhoneNumber, city },
      process.env.SECRET_KEY,
      {
        expiresIn,
      },
    )

    return { message: 'Auth success!', expiresIn, access_token }
  } else {
    throw new Error('Invalid password or email')
  }
}

module.exports = { LoginPassenger }
