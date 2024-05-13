const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerGenerate = require('./swagger.json')

const router = express.Router()

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Drive-link',
      version: '1.0.0',
      description: 'Drive link ',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'LogRocket',
        url: 'https://logrocket.com',
        email: 'info@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./app/routes/*.js'],
}

router.use(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerGenerate, { customCss: '.swagger-ui .topbar { display: none; }' }),
)

// router.use('/', swaggerUi.serve)
// router.get('/', swaggerUi.setup(swaggerGenerate, { customCss: '.swagger-ui .topbar { display: none; }' }))

module.exports = router
