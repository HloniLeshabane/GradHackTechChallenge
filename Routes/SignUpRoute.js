'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const db_f = require('../db_functions.js')
const bcrypt = require('bcrypt')
const mail = require('../mail')
const router = express.Router()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'sign_up_files', 'signup.html'))
})

router.post('/', async (req, res) => {
  const username = req.body.username
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const address = req.body.address
  const email = req.body.email
  let password = req.body.password

  const salt = await bcrypt.genSalt()
  password = await bcrypt.hash(password, salt)
  const subject = 'FundaNami app signup'
  const text = 'You have signed up on fundaNami app'

  mail(email, subject, text, (err, data) => {
    if (err) {
      throw Error('email not sent')
    } else
      {res.sendFile(path.join(__dirname, '../views', 'sign_up_files', 'email_success.html'))}
  }
  )

  db_f.insertStudent(firstname, lastname, address, email, username, password)

  res.redirect('/')
})

module.exports = router
