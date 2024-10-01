const jwt = require('jsonwebtoken')
const { passengers } = require('../../models')
const { userPassenger } = require('../../services/passengers/profile')
const generateToken = require('../../utils/generateReferralCode')

const GetPassengerProfile = async (request, response) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const { email } = jwt.decode(token, process.env.SECRET_KEY)

    const passenger = await userPassenger({ email })

    return response.status(200).json({
      Passenger: passenger,
      Profile: await passenger.getProfile({ include: ['cars', 'card', 'trustedbuddies'] }),
      status: true,
    })
  } catch (error) {
    console.log(error)
    response.status(401).json({ message: 'Unauthorized', status: false })
  }
}

const CreateProfile = async (request, response) => {
  try {
    /*
    #swagger.requestBody = {
    required: true,
    in: 'body',
    description: 'Create passenger profile',
    schema: {
      $ref: '#/definitions/passengersProfile'
    }
   }
  */
    const { Cars, TrustedBuddies, Card } = request.body

    const userId = jwt.decode(request.headers.authorization.split(' ')[1])
    const passenger = await passengers.findOne({ where: { id: userId.userId } })

    const profile = await passenger.createProfile({
      role: 'passenger',
      referralCode: generateToken(7),
    })

    await Promise.all([
      ...Cars.map((car) => profile.createCar(car)),
      ...TrustedBuddies.map((buddy) => profile.createTrustedbuddy(buddy)),
      ...Card.map((card) => profile.createCard(card)),
    ])

    return response.status(201).json({ message: 'Profile created!' })
  } catch (err) {
    console.error(err)
    return response.status(400).json({ message: 'Failed to create profile', status: false })
  }
}

module.exports = { GetPassengerProfile, CreateProfile }
