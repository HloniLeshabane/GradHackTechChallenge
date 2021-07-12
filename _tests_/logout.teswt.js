'use strict'

const logout_route = require('../Routes/logout_route.js')

const request = require('supertest')
let app = require('../server.js').app
let server = require('../server.js').httpserver
jest.setTimeout(8000)
app.use(logout_route)

describe('Testing log out functionality', () => {
    test('Status on route handler', async (done) => {
        const res = await request(app).get('/logout')
        expect(res.statusCode).toBe(302)
    })

    afterAll(() => {
        server.close()
  });

})
