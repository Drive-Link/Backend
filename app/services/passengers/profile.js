const { passengers } = require('../../models')
const generateReferralCode = require('../../utils/generateReferralCode')

module.exports = {
  userPassenger: async ({ email }) => {
    return passengers.findOne({
      where: { email },
      attributes: ['email', 'phoneNumber', 'city', 'lastName', 'firstName', 'id'],
    })
  },
  CreateProfile: async () => {
    return { message: 'create profile' }
  },
}
