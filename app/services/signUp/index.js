const db = require('../../models')
const { schema } = require('./schema')


const GetAllDriver = async function ({ firstName }) {
  schema.validateAsync()
  console.log(await db.Users.findAll())
  return 'Hmmm.. Workinh'
}

module.exports = { GetAllDriver }
