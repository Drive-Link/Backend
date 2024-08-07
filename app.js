const express = require('express')
const db = require('./app/models')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('./swagger')
const passengerRegister = require('./app/routes/passengers/register')
const passengerLogin = require('./app/routes/passengers/login')
const driverLogin = require('./app/routes/drivers/login')
const driverRegister = require('./app/routes/drivers/register')
const resetPassword = require('./app/routes/passengers/resetPassword')
const passengerProfile = require('./app/routes/passengers/profile')
const passengerUpload = require('./app/routes/uploads')
const carDetails = require('./app/routes/passengers/personalDetails')
const passengerHome = require('./app/routes/passengers/home')
const driverProfile = require('./app/routes/drivers/profile')

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
app.use('/uploads', express.static('uploads'))
app.use(cors({ origin: 'http://localhost:4000/', methods: 'GET', allowedHeaders: ['Content-Type', 'Authorization'] }))
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swagger)
app.use('/api/v1/passenger/register', passengerRegister)
app.use('/api/v1', passengerUpload)
app.use('/api/v1/passenger/login', passengerLogin)
app.use('/api/v1/driver/login', driverLogin)
app.use('/api/v1/passenger/reset_password', resetPassword)
app.use('/api/v1/passengers/profile', passengerProfile)
app.use('/api/v1/driver/register', driverRegister)
app.use('/api/v1/passenger', carDetails)
app.use('/api/v1/driver/profile', driverProfile)
app.use('/api/v1/passengers/home', passengerHome)

module.exports = app
