'use strict'
const path = require('path')
const express = require('express')
const db_f = require('../db_functions.js')
const router = express.Router()
const JWT = require('jsonwebtoken')
const checkforloggedin = require('../cookie_check.js').checkforloggedin
// temporary(will be made using environment variables)
const secret_key = 'fundanami'
// 1 day in seconds
const cookie_expiry = 86400

const createToken = async function (username) {
  const user = {
    username: username
  }

  return JWT.sign(user, secret_key, {
    expiresIn: cookie_expiry
  })
}

router.get('/', checkforloggedin, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'login_files', 'login.html'))
})

router.post('/', async (req, res) => {
  const validity = await db_f.authenticateStudent(req.body.username, req.body.password)

  if (validity == true) {
    if (req.cookies.fundanami_login) {
      res.redirect('/dashboard')
    } else {
      const token = await createToken(req.body.username)
      console.log(token)

      res.cookie('fundanami_login',
        token,
        {
          maxAge: cookie_expiry * 1000
        })

      res.redirect('/dashboard')
    }
  } else {
    res.render('login', {
      message: 'Incorrect user login/password!'
    })
  }
  console.log(req.body.username)
  console.log(req.body.password)
})

module.exports = router
