const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./app.js'] // Path to your Express route files

swaggerAutogen(outputFile, endpointsFiles)
