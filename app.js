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
const admin = require('./app/routes/admin/login')
const fetch = require('./app/routes/admin/fetch')
const redis = require('redis');


const auth = async () => {
  try {
    await db.sequelize.authenticate()
    console.info('Database is connected')
  } catch (error) {
    console.error(error.message)
  }
}



// Create Redis client and connect to the Redis service in Docker Compose
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'redis',  // 'redis' refers to the Docker service name
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error', err);
});

auth()

app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(
  cors({
    origins: ['http://localhost:4000/', 'https://backend-ukbu.onrender.com/'],
    methods: 'GET',
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
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
app.use('/api/v1/driver', driverProfile)
app.use('/api/v1/passengers/home', passengerHome)
app.use('/api/v1', admin)
app.use('/', fetch)

module.exports = app
