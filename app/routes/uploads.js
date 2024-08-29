// routes/upload.js
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auths')
const { multipleUpload } = require('../middleware/uploads')
const { storeFiles, patchFiles } = require('../controllers/storefile')

router.post('/:role/upload', auth.verifyPassengerAndDriver, multipleUpload, storeFiles)

router.put('/:role/upload', auth.verifyPassengerAndDriver, multipleUpload, patchFiles)

module.exports = router
