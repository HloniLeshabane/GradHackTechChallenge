'use strict'
const path = require('path')
const express = require('express')
const check = require('../cookie_check.js').check
const router = express.Router()

router.get('/:groupname',check, (req, res) => {
  res.render('Covid_screen',{
    groupname:req.params.groupname
  })
})

module.exports = router
