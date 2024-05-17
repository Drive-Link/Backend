const express = require('express')
const { CronJob } = require('cron')

const app = express()

// Define a cron job to run every 5 seconds
const job = new CronJob('*/5 * * * * *', () => {
  console.log('Running a task every 5 seconds')
  // Add your task logic here
})

// Start the cron job
job.start()

// Your usual Express setup
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
