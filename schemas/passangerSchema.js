const Joi = require('joi')

const passangerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = passangerSchema
