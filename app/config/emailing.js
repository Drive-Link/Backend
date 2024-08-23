const nodemailer = require('nodemailer')
const ejs = require('ejs')

const path = require('path')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})

const sendEmail = async ({ to, subject, templateName, data }) => {
  const templatePath = path.join(__dirname, 'templates/' + templateName)

  const html = await ejs.renderFile(templatePath, { data })

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// sendEmail('davidhustler78@gmail.com', 'Welcome', 'resetPassword.ejs', (data = { token: 'okx' , email: }))
// Export the sendEmail function
module.exports = sendEmail
