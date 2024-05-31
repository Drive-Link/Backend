const express = require('express')
const db = require('./app/models')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('./swagger')
const passengerRegister = require('./app/routes/passengers/register')
const passengerLogin = require('./app/routes/passengers/login')
const driverRegister = require('./app/routes/drivers/register')
const resetPassword = require('./app/routes/passengers/resetPassword')
const passengerProfile = require('./app/routes/passengers/profile')
const passengerUpload = require('./app/routes/passengers/imgaeUpload')
const carDetails = require('./app/routes/passengers/carDetails')

const auth = async () => {
  try {
    await db.sequelize.authenticate()
    console.info('Database is connected')
  } catch (error) {
    console.error(error.message)
  }
}

auth()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5000/', methods: 'GET', allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swagger)
app.use('/api/v1/passenger/register/', passengerRegister)
app.use('/api/v1/passenger/upload', passengerUpload)
app.use('/api/v1/passenger/login', passengerLogin)
app.use('/api/v1/driver/login', passengerLogin)
app.use('/api/v1/passenger/reset_password', resetPassword)
app.use('/api/v1/passengers', passengerProfile)
app.use('/api/v1/driver/register', driverRegister)
app.use('/api/v1/car', carDetails)

module.exports = app
