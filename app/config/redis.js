const redis = require('redis')

const client = redis.createClient({
  url: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_REDIS : process.env.LOCAL_REDIS,
})

client.connect()
client.on('connect', async function () {
  console.log('Connected!')
})

module.exports = client
