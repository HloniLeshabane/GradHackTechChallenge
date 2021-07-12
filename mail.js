
'use strict'
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

const SendEmail = (emailTo, emailSubject, emailText, callback) => {
  const mailOptions = {

    from: 'fundanamigroup11@gmail.com',
    to: emailTo,
    subject: emailSubject,
    text: emailText
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) { callback(err, null) } else { callback(null, data) }
  })
}

module.exports = SendEmail
