const Joi = require('joi')

const schema = Joi.object({
  email: Joi.string(),
  phoneNumber: Joi.string(),
  country: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  
})
