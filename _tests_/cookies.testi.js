'use struct'

const dashboardRoute = require('../Routes/dashboard_route')

const request = require('supertest')

const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(dashboardRoute)

describe('Checking if dashboard route routes to html', () => {
  test('Correct route', done => {
    request(app)
      .get('/dashboard')
      .expect()
    done()
  })
})
