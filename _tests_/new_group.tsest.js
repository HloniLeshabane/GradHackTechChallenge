'use strict'
/** ****Testing create new group functionality"*****/
const createNewGroup = require('../Routes/search_route.js')

const request = require('supertest')
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/search', createNewGroup)

test('search route is loaded', done => {
  request(app)
    .get('/search')
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .expect(200, done)
})
