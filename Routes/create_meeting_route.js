'use strict'
const path = require('path')
const express = require('express')
const check = require('../cookie_check.js').check
const router = express.Router()
const getUserName = require('../cookie_check.js').getUserName
const db_f = require('../db_functions.js')

router.get('/',check, async (req, res) => {
  const username = getUserName(req)
  const groups = await db_f.getGroups(username)

  res.render('create_new_meeting', {
    groups: groups.Result.recordset
  })
})

router.post('/',check, async (req, res) => {
  const io = req.app.get('socketio')
  const username = getUserName(req)

  const newStr = req.body.Date.replace(/-/g, '/')
  const str = newStr.substring(2)
  let d = new Date()
  let n = d.getFullYear()
  let end = n.toString().concat(str)
  const data = {
    GroupName: req.body.GroupName,
    Date: end,
    Author: username,
    Agenda: req.body.Agenda,
    StartTime: req.body.StartTime,
    Duration: req.body.Duration
  }

  console.log(data)
  await db_f.createMeeting(data)

  io.on('connection', (socket) => {
    socket.emit('created', {
      message: 'Created'
    })
  })

  res.status(200)
})

module.exports = router
