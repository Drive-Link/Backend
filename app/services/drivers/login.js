const { driver } = require('../../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const LoginDriverIn = async function ({ email, password }) {
  const userDriver = await driver.findOne({
    where: { email },
    attributes: ['email', 'id', 'city', 'phoneNumber', 'hash'],
  })

  // const userDriverProfile = await userDriver.getDriverProfile()

  const { hash, email: driverEmail, city, phoneNumber, id: userId } = userDriver.toJSON()

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
