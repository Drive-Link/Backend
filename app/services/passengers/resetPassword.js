const db = require('../../models')
const jwt = require('jsonwebtoken')

/**
 *
 * @param {string} email
 * @returns {Promise<{access_token: string}>}
 */

const ResetPassword = async function ({ email }) {
  if (await db.passengers.findOne({ where: { email }, attributes: ['city'] })) {
    const {
      dataValues: { email: customer_email, city, firstName, lastName },
    } = await db.passengers.findOne({ where: { email }, attributes: ['city', 'firstName', 'lastName', 'email'] })

    console.log(jwt.sign({ customer_email, city, firstName, lastName }, process.env.SECRET_KEY, { expiresIn: '10m' }))
  } else {
    console.log('User not found!')
  }

  return { message: 'check email for further procedure' }
}

module.exports = { ResetPassword }
