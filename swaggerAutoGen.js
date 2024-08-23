const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  autoHeaders: false,
  disableLogs: false,
  autoQuery: false,
  autoBody: false,
})
const express = require('express')

const router = express.Router()

const outputFile = './swagger.json'
const endpointsFiles = ['./app.js'] // Path to your Express route files

const doc = {
  info: {
    title: 'Backend APIs for Drivelink',
    version: '1.0.0',
    consumes: ['application/json', 'multipart/form-data'],
    description: 'API documentation for Drivelink',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
    contact: {
      name: 'Drivelink API Support',
      url: 'https://www.example.com/support',
      email: 'support@example.com',
    },
  },
  autoBody: 'false',
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'localhost',
    },
    {
      url: 'https://backend-ukbu.onrender.com/',
      description: 'online',
    },
  ],
  host: ['localhost:4000'],
  baseUrl: 'http://localhost',
  schemes: ['http', 'https'],
  definitions: {
    basicInfo: {
      firstName: 'John',
      lastName: 'Joe',
      $password: 'lol',
      $phoneNumber: '2348159655468',
      $email: 'lild93078@gmail.com',
      country: 'Nigeria',
      city: 'lagos',
      state: 'ikoyi',
    },
    passengers: {
      $ref: '#/definitions/basicInfo',
    },
    drivers: {
      $ref: '#/definitions/basicInfo',
    },
    responseLogin: {
      message: 'Login Successful',
      data: {
        user: {
          userId: 1,
          email: 'any',
          phoneNumber: 'any',
          role: 'passenger',
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGFzc2VuZ2VyIiwiZW1haWwiOiJhbnkiLCJ1c2VySWQiOjEsInBob25lTnVtYmVyIjoiYW55IiwiY2l0eSI6ImFueSIsImlhdCI6MTcxOTkzNjg0MCwiZXhwIjoxNzI3NzEyODQwfQ.OW3g1xbjcqejhWtON_X0UoWjZC31wAABqGzNFhGGRTM',
        },
      },
      status: true,
    },
    responseRegister: {},
    UpdatePasswordPayload: {
      $token: 250700,
      $password: 'lolz',
      $confirmPassword: 'lolz',
    },
    passengersProfile: {
      Cars: [
        {
          carName: 'Hunda',
          carBrand: 'Toyota',
          type: 'SUV',
          plateNumber: 'ABC123',
        },
      ],
      Card: [
        {
          cardNumber: '1234567890123456',
          cvv: 123,
          expiryDate: '2022-12-31',
        },
      ],
      TrustedBuddies: [
        {
          name: 'Isaac',
          email: 'isaac@gmail.com',
          phoneNumber: '08123456789',
        },
      ],
    },
    passengersNewDetails: {
      Cars: [
        {
          carName: 'Hunda',
          carBrand: 'Toyota',
          type: 'SUV',
          plateNumber: 'ABC123',
        },
      ],
    },
    login: {
      $email: 'lild93078@gmail.com',
      $password: 'lol',
    },
    resetPasswordPayload: {
      $email: 'lild93078@gmail.com',
    },
  },

  components: {
    securitySchemes: {
      passengerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
      driverAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },

  security: [
    {
      BearerAuth: [],
    },
  ],
}

swaggerAutogen(outputFile, endpointsFiles, doc)

router.use('/', express.static('./node_modules/swagger-ui-dist'))
router.get('/swagger', (req, res) => {
  res.sendFile(__dirname + '/swagger.json')
})
