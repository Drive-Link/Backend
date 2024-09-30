const express = require('express')
const router = express.Router()
const driveProfile = require('../../controllers/drivers/profile')

router.post('/', driveProfile.CreateDriverProfile)

router.get('/profile', driveProfile.GetDriverProfile)
router.get('/all-drivers', driveProfile.GetAllDrivers)
router.get('/passengers/:passengerId/closest-drivers', driveProfile.GetClosestDrivers)
router.post('/:passengerId/:driverId/send-request', driveProfile.sendRequest)
router.get('/requests/:driverId', driveProfile.GetDriverRequests)
router.get('/requests/accept/:RequestId', driveProfile.AcceptRequest)
router.get('/requests/cancel/:RequestId', driveProfile.CancelRequest)


 
module.exports = router
 