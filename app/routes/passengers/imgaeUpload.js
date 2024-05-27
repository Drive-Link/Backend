const express = require('express')
const multer = require('multer')
const { createClient } = require('@supabase/supabase-js')

const router = express.Router()

// Initialize supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { userId } = req.body // Assuming userId is sent in the body
    const file = req.file

    if (!file) {
      return res.status(400).send('No file uploaded.')
    }

    const fileName = `${userId}/${Date.now()}_${file.originalname}`
    console.log(file.buffer)

    const { data, error } = await supabase.storage
      .from('ecommerce') // Replace with your Supabase storage bucket name
      .upload(fileName, file.buffer)

    if (error) {
      console.log(error)
      return res.status(500).send(error)
    }

    const { publicURL, error: urlError } = supabase.storage.from('ecommerce').getPublicUrl(fileName)

    if (urlError) {
      return res.status(500).send(urlError.message)
    }

    res.status(200).json({ fileURL: publicURL, userId: userId })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
