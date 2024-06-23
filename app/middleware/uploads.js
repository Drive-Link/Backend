const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + `-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf/
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype) {
      cb(null, false)
    } else {
      cb(null, false)
    }
  },
})

module.exports = {
  singleUpload: upload.single('file'),
  multipleUpload: upload.fields([
    { name: 'identificationCardBack', maxCount: 1 },
    { name: 'profilePicture', maxCount: 1 },
    { name: 'medicalReport', maxCount: 1 },
    { name: 'driverLicenceFront', maxCount: 1 },
    { name: 'driverLicenceBack', maxCount: 1 },
    { name: 'identificationCardFront', maxCount: 1 },
  ]),
}
