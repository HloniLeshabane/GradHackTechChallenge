'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const db_f = require('../db_functions.js')
const getUserName = require('../cookie_check.js').getUserName
const bodyParser = require('body-parser')
const check = require('../cookie_check.js').check
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',check, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'create_new_group_files', 'create_new_group.html'))
})

router.post('/',check, async (req, res) => {
  const name = req.body.groupName
  const description = req.body.groupDescription
  const theme = req.body.groupTheme
  const activity = 'Created group'
  
  const groupLog = name + 'Log'

  const result = await db_f.insertGroup(name, description, theme)
  if (result) {
    const username = getUserName(req)
    console.log(username)
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    db_f.addStudenttoGroup(username, name, today.toDateString())
    db_f.Log_creation(name, groupLog)
    db_f.Log(groupLog, username, activity, today.toDateString())
    res.sendFile(path.join(__dirname, '../views', 'create_new_group_files', 'group_created.html'))
  } else {
    res.redirect('/')
  }

  // res.redirect('/dashboard')
})
module.exports = router
