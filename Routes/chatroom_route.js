'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const getUserName = require('../cookie_check.js').getUserName
const db = require('../db')
const Cookies = require('../js/groupCookie')
const check = require('../cookie_check.js').check
router.get('/chats', (req, res) => {
  var cookies = req.cookies
  var groupName = Cookies.getgroup('GName', JSON.stringify(cookies))

  // const username = getUserName(req)
  // const user = document.getElementById('student')
  // user.innerHTML = username

  db.pools
  // Run query
    .then((pool) => {
      return pool.request()
      // This is only a test query, change it to whatever you need
        .query('SELECT * FROM ' + groupName)
    })

    // Send back the result
    .then(result => {
      res.send(result.recordset)
      // return res.redirected('/chatroom')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.post('/send',check, (req, res) => {
  var msg = req.body.text
  const username = getUserName(req)
  var cookies = req.cookies
  var groupName = Cookies.getgroup('GName', JSON.stringify(cookies))

  // const time = new Date()
  // const sender = req.body.member
  db.pools
  // Run query
    .then((pool) => {
      return pool.request()
      // This is only a test query, change it to whatever you need
        .query('INSERT INTO ' + groupName + `(Student_Name,Msg) VALUES ('${username}','${msg}')`)
    }).then(() => {
      res.redirect('/group/' + groupName)
    })

  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

module.exports = router
