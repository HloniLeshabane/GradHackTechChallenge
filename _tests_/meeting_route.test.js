'use struct'

const meetingRoute = require('../Routes/MeetingRoute')

const request = require('supertest')

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(meetingRoute)

describe('Checking if meeting route routes to html', () => {
  test('Correct route', done => {
    request(app)
      .get('/meeting')
      .expect('Content-Type', 'text/html; charset=UTF-8')
    done()
  })

})
