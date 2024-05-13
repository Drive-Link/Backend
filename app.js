const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const swagger = require('./swagger')
const register = require('./app/routes/signUp')


app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swagger)
app.use('/api/v1/register', register)

module.exports = app
