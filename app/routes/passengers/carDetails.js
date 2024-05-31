const express = require('express')
const router = express.Router()
const { passengers } = require('../../models')

router.get('/', async (request, response) => {
  try {
    const profile = await passengers.findByPk(2)
    console.log((await profile.createProfile({ shortBio: 'kol' })).toJSON())
    response.status(200).json({ car: await profile.getProfile() })
  } catch (err) {
    console.log(err)
    response.status(400).json({ code: 'failed' })
  }
})

module.exports = router
