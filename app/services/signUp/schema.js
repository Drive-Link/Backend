const Joi = require('joi')

const schema = Joi.object({
  firstName: Joi.string().required(true),
})

module.exports = { schema }
