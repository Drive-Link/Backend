const db = require('../../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const LoginDriverIn = async function ({ email, password }) {
  const userDriver = await db.driver.findOne({
    where: { email },
    include: [{ model: db.driverProfile }],
  })

  const { hash, email: driverEmail, city, phoneNumber, id: userId, lastName, firstName } = userDriver.toJSON()

  if (await bcrypt.compare(password, hash)) {
    const accessToken = jwt.sign({ role: 'driver', email, userId, phoneNumber }, process.env.SECRET_KEY, {
      expiresIn: '90d',
    })

    return {
      message: 'Login successful',
      data: {
        user: {
          userId,
          email,
          lastName,
          firstName,
          city,
          role: 'driver',
          accessToken,
        },
      },
      status: true,
    }
  } else {
    throw new Error('Invalid email or password')
  }
}

module.exports = LoginDriverIn
