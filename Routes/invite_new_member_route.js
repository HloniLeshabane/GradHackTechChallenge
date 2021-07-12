'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const check = require('../cookie_check.js').check
const bodyParser = require('body-parser')
const mail = require('../mail')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/dashboard/invite_new_member',check, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'invite_new_member_files', 'invite_new_member.html'))
})

router.post('/dashboard/invite_new_member',check, (req, res) => {
  const email = req.body.member
  const subject = 'Group invitation'
  const text = 'You have a new group invite from fundaNami app'
  mail(email, subject, text, (err, data) => {
    if (err) { throw Error('email not sent') } else res.sendFile(path.join(__dirname, '../views', 'sign_up_files', 'email_success.html'))
  }
  )
})

module.exports = router
