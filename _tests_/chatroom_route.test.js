'use strict'

const ScreeningRoute = require('../Routes/chatroom_route')

const request = require('supertest')
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/chatroom', ScreeningRoute)

describe('The chatting route goes to html', () => {
  test('chatroom route works', done => {
    request(app)
      .get('/chatroom')
      .expect('Content-Type', 'text/html; charset=UTF-8')
    done()
  })
})
