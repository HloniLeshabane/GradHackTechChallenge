'use strict'
const path = require('path')
const express = require('express')
const db_f = require('../db_functions.js')
const router = express.Router()
const check = require('../cookie_check.js').check
const getUserName = require('../cookie_check.js').getUserName
const JWT = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
router.get('/', check, async (req, res) => {
  const username = getUserName(req)
  const groups = await db_f.getGroups(username)
  const meetings = await db_f.getMeetings(username)
  // const rating = await db_f.getStudentRating(username)
  // console.log(rating)
  //console.log(meetings.Result.recordset)

  res.render('dashboard', {
    name: username,
    groups: groups.Result.recordset,
    meetings: meetings.Result.recordset
  })
})

router.post('/deleteMeeting',check,jsonParser, async(req, res) => {
  const username = getUserName(req)
  console.log('date:'+req.body.date,'groupname:'+req.body.groupname2)

  await db_f.deleteMeeting(req.body.groupname,req.body.date)
  res.status(200)
})

module.exports = router
