// routes/upload.js
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auths')
const { multipleUpload } = require('../middleware/uploads')
const storeFiles = require('../controllers/storefile')

// router.post('/:role/upload/single', auth, singleUpload, storeFiles)
router.post('/:role/upload', auth, multipleUpload, storeFiles)

module.exports = router
