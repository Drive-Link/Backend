const jwt = require('jsonwebtoken')
const db = require('../../models')

module.exports = {
  CreateDriverProfile: async (request, response) => {
    /*
      #swagger.requestBody = {
        required: true,
        in: 'body',
        description: 'Create driver profile',
        schema: {
          $ref: '#/definitions/accountDetails'
        }
      }
    */

    try {
      const accounDetails = request.body

      const driverInfo = await db.driver.findByPk(
        jwt.verify(request.headers.authorization.split(' ')?.[1], process.env.SECRET_KEY)?.userId,
        { include: [{ model: db.driverProfile }] },
      )

      const driverDetails = await driverInfo.driverProfile.createAccountDetail(accounDetails)

      return response.status(201).json({ status: true, message: 'driver profile created successfully!' })
    } catch (err) {
      console.log(err)
      response.status(400).json({ status: false, message: err.message })
    }
  },
  GetDriverProfile: async (request, response) => {
    try {
      const token = request.headers.authorization.split(' ')[1]
      const { email } = jwt.decode(token)

      const userDriver = await db.driver.findOne({
        where: { email },
        attributes: { exclude: ['hash', 'createdAt', 'updatedAt'] },
        include: {
          model: db.driverProfile,
          include: [
            { model: db.accountDetails },
            { model: db.driverLicense },
            { model: db.identificationCard },
            { model: db.medicalReport },
          ],
        },
      })

      return response.status(200).json({ message: 'driver profile', userDriver })
    } catch (err) {
      console.log(err)
      return response.status(400).json({ message: err.message })
    }
  },
}
