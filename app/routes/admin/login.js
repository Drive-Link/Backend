const db = require('../../models')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/admin/login', async function (request, response) {
  // #swagger.autoBody = false
  /*

   #swagger.requestBody = {
      required: true,
      in: 'body',
      description: 'Route for logi',
      schema: {
        $ref: '#/definitions/adminLogin'
      }
    }
   */

  const { email, password } = request.body
  const { email: adminEmail, password: hash } = await db.admin.findOne({ where: { email } })

  if (await bcrypt.compare(password, hash)) {
    const accessToken = jwt.sign({ email, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '30m' })

    const payload = {
      message: 'Login Successful',
      data: {
        user: {
          userId: 1,
          email: adminEmail,
          role: 'admin',
          accessToken,
        },
      },
      status: true,
    }
    return response.status(200).json({ ...payload })
  } else {
    response.status(401).json({ message: 'Unauthorized' })
  }
})

module.exports = router
