const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auths')
const driverProfile = require('../../controllers/drivers/profile')

router.post('/', auth.verifyDriver, driverProfile.CreateDriverProfile)

router.get('/profile', driverProfile.GetDriverProfile)
router.get('/all-drivers', driverProfile.GetAllDrivers)
router.get('/passengers/:passengerId/closest-drivers', driverProfile.GetClosestDrivers)
router.post('/:passengerId/:driverId/send-request', driverProfile.sendRequest)
router.get('/requests/:driverId', driverProfile.GetDriverRequests)
router.get('/requests/accept/:RequestId', driverProfile.AcceptRequest)
router.get('/requests/cancel/:RequestId', driverProfile.CancelRequest)


 
module.exports = router
 