const express = require('express')
const db = require('./app/models')
const { ProxyManager } = require('@adedayomatthews/proxy-manager')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('./swagger')
const register = require('./app/routes/passengers/register')
const login = require('./app/routes/passengers/login')
const resetPassword = require('./app/routes/passengers/resetPassword')

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
app.use(cors({ origin: 'http://localhost:5000' }))
app.use(express.urlencoded({ extended: false }))
app.use('/', proxyManager.getManagementRouter())

const proxyManager = new ProxyManager(app)
proxyManager.addDocumentation()

app.use('/api-docs', swagger)
app.use('/api/v1/passenger/register', register)
app.use('/api/v1/passenger/login', login)
app.use('/api/v1/passenger/reset_password', resetPassword)

module.exports = app
