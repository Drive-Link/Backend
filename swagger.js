const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerGenerate = require('./swagger.json')

const router = express.Router()

router.get(
  '/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerGenerate, { customCss: '.swagger-ui .topbar { display: none; }' }),
)

module.exports = router
