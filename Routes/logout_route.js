'use strict'

process.env.NODE_ENV = 'test'
const path = require('path')
const express = require('express')
const router = express.Router()
const JWT = require('jsonwebtoken')

router.get('/', (req, res) => {
  res.cookie('fundanami_login', '', { maxAge: 1 })
  res.status(200)
  res.redirect('/')
})

module.exports = router
