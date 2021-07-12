'use strict'
const path = require('path')
const express = require('express')
const check = require('../cookie_check.js').check
const router = express.Router()
const getUserName = require('../cookie_check.js').getUserName
const db_f = require('../db_functions.js')
const { route } = require('./login_route.js')

router.get('/:groupname',check, async (req, res) => {
  const username = getUserName(req)
  const groupname = req.params.groupname
  const students = await db_f.fetchStudentsFullNameinGroup(groupname)

  const studentingroup = await db_f.getStudentinGroupList(username, groupname)
  // const student = await db_f.getStudentinGroupList(username, groupname)

  res.render('rating', {
    username,
    groupname,
    students: students.Result.recordset,
    mydate: studentingroup.Result.recordset[0].DateAdded
  })
})

router.post('/', async (req, res) => {
  await db_f.setRating(req.body.person, req.body.rating)
  res.status(200)
})

module.exports = router
