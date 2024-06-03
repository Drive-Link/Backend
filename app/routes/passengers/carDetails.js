const express = require('express')
const router = express.Router()
const { passengers } = require('../../models')

router.get('/', async (request, response) => {
  try {
    const profile = await passengers.findOne({ id: 1 })
    const profile1 = await profile.getProfile({ referralCode: 'kidmkmk' })
    console.log(await profile1.createCar({}))
    // console.log((await profile.createProfile({ shortBio: 'kol' })).toJSON())
    response.status(200).json({ car: 'P' })
  } catch (err) {
    console.log(err)
    response.status(400).json({ code: 'failed' })
  }
})

module.exports = router
