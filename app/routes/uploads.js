// routes/upload.js
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auths')
const { multipleUpload } = require('../middleware/uploads')
const { storeFiles, patchFiles } = require('../controllers/storefile')

router.post('/:role/upload', auth, multipleUpload, storeFiles)

router.put('/:role/upload', auth, multipleUpload, patchFiles)

module.exports = router
