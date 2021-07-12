'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const check = require('../cookie_check.js').check

router.get('/:groupname',check, (req, res) => {
  res.render('screening_form',{
    groupname:req.params.groupname
  })
})

module.exports = router
