'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const check = require('../cookie_check.js').check
const db_f = require('../db_functions.js')

router.get('/:search',check, async (req, res) => {
  const result = await db_f.queryGroup(req.params.search)
  const result2 = await db_f.queryStudent(req.params.search)
  console.log(result.Result.recordset)

  res.render('results', {
    groups: result.Result.recordset,
    people: result2.Result.recordset
  })
})

module.exports = router
