'use strict'

const ScreeningRoute = require('../Routes/screening_route.js')
const Landing = require('../Routes/screening_route.js')
const Cookies = require('../js/groupCookie')
const votingRoute = require('../Routes/voting_route.js')

const request = require('supertest')
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(ScreeningRoute)

const signUpRoute = require('../Routes/invite_new_member_route.js')
app.use(signUpRoute)

app.use('/group', Landing)

app.use(votingRoute)

describe('Checking if voting route routes to html', () => {
  test('voting route works', done => {
    request(app)
      .get('/voting')
      .expect('Content-Type', 'text/html; charset=UTF-8')
    done()
  })
})

describe('The screening route goes to html', () => {
  test('screening route works', done => {
    request(app)
      .get('/screening')
      .expect('Content-Type', 'text/html; charset=UTF-8')
    done()
  })
})

describe('The screening route goes to html', () => {
  test('screening route works', done => {
    request(app)
      .get('/group/:group')
      .expect('Content-Type', 'text/html; charset=UTF-8')
    done()
  })
})

describe('Get the object name', () => {
  test('get object works', () => {
    var cookies = '{"name":"John"}'

    expect(Cookies.getgroup('name', cookies) == 'John')
  })
  test('get group works with more groups', () => {
    var cookies = '{"name":"John", "age":30, "city":"New York"}'

    expect(Cookies.getgroup('name', cookies) == 'John')
  })
})
