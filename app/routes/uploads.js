const express = require('express')
const router = express.Router()
const auth = require('../middleware/auths')
const { multipleUpload } = require('../middleware/uploads')
const { storeFiles, patchFiles } = require('../controllers/storefile')

router.post('/:role/upload', auth.verifyPassenger, multipleUpload, storeFiles)

router.put('/:role/upload', auth.verifyPassenger, multipleUpload, patchFiles)

module.exports = router
