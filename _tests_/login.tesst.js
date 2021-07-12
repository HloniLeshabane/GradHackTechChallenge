
// const votingRoute = require('../Routes/login_route')
const loginroute = require('../Routes/login_route')
const request = require('supertest')

const app = require('../server.js').app
const server = require('../server.js').httpserver
const server2 = require('../server.js').server
jest.setTimeout(8000)
describe('Checking if login route routes to html initially', () => {
  it('login route works', async () => {
    const res = await request(app)
      .get('/login')
      .expect('Content-Type', 'text/html; charset=UTF-8')
  })

  afterAll(() => {
    // server.close()
    server2.close()
  })
})
/*
var request = require("supertest");
import app from "../../src/app";

describe("GET/ api/location/id", () => {
  it("should connect retrieve record and retrieve a code 200 and json response", async () => {
    const res = await request(app)
      .get(`/api/location/${id}`)

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(`${id}`);
  });
}); */
