const db = require('../../models')
const { schema } = require('./schema')

const GetAllDriver = async function ({ firstName }) {
  await schema.validateAsync()
  return 'Hmmm.. Workinh'
}

module.exports = { GetAllDriver }
