'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const check = require('../cookie_check.js').check
const db_f = require('../db_functions.js')

router.get('/',check, async (req, res) => {
    res.render('protest')
})
  
module.exports = router