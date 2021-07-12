const express = require('express')
const app = express()

const path = require('path')
const loginRoute = require('./Routes/login_route.js')
const createNewGroupRoute = require('./Routes/create_new_group_route.js')

const signUpRoute = require('./Routes/SignUpRoute')
const ScreeningRoute = require('./Routes/screening_route.js')

const searchRoute = require('./Routes/search_route.js')
const votingRoute = require('./Routes/voting_route.js')
const meetingRoute = require('./Routes/MeetingRoute.js')
const chatroomRoute = require('./Routes/chatroom_route.js')
const dashboardRoute = require('./Routes/dashboard_route.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(loginRoute)
app.use(createNewGroupRoute)

app.use('/signup', signUpRoute)
app.use(ScreeningRoute)

app.use('/dashboard', dashboardRoute)
app.use(votingRoute)
app.use(loginRoute)
app.use(searchRoute)
app.use(chatroomRoute)

app.use('/login', loginRoute)
app.use('/create_new_group', createNewGroupRoute)
app.use('/meeting', meetingRoute)

app.use(express.static(__dirname + '/'))

module.exports = {
  app
}
