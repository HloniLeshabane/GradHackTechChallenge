'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const check = require('../cookie_check.js').check
const bodyParser = require('body-parser')
require('dotenv').config()

const Pusher = require('pusher')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))



const pusher = new Pusher({
  appId: '1222159',
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET_KEY,
  cluster: 'mt1',
  useTLS: true
})

router.get('/',check, (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'voting_files', 'vote.html'))
})

router.post('/',check, (req, res) => {

  console.log(req.body)
  pusher.trigger('fundaNami-poll', 'fundaNami-vote', {
    points: 1,
    vot: req.body.vot

  }
  
  )
  return res.json({ success: true, message: `Thank you for voting` })
})

module.exports = router
