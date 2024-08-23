const redis = require('redis')

const client = redis.createClient({ url: 'redis://host.docker.internal:6379' })

client.connect()
client.on('connect', async function () {
  console.log('Connected!')
})

module.exports = client
