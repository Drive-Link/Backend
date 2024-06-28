const app = require('./app')

require('dotenv').config()

const PORT = process.env.PORT || 4000
console.log(PORT)

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`)
})
