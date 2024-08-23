const db = require('../../models')
const client = require('../../config/redis')
const mailing = require('../../config//emailing')
const bcrypt = require('bcryptjs')

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

    const generateRandomNumber = () => {
      const randomNumber = Math.floor(Math.random() * 1000000)
      return String(randomNumber).padStart(6, '0')
    }

    const token = generateRandomNumber()

    client.setEx(token, 60 * 10, customer_email)

    console.log(
      await mailing({
        to: customer_email,
        subject: 'Reset Password',
        templateName: 'resetPassword.ejs',
        data: { token, email: customer_email },
      }),
    )

    return { message: 'check email for further procedure' }
  }

  return { message: 'check email for further procedure' }
}
const ChangePasswordHandler = async function ({ token, password, confirmPassword }) {
  const customer_email = await client.get(String(token))

  if (customer_email) {
    await db.passengers.update(
      {
        hash: await bcrypt.hash(password, 10),
      },
      { where: { email: customer_email } },
    )

    await client.del(String(token))

    return { message: 'Password changed successfully' }
  }

  return { status: false, message: 'Token expired or invalid' }
}

module.exports = { ResetPassword, ChangePasswordHandler }
