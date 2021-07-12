const express = require('express')
const app = express()
const http = require('http')
const socketio = require('socket.io')
var cors = require('cors')
app.use(cors())
const path = require('path')
const loginRoute = require('./Routes/login_route.js')
const createNewGroupRoute = require('./Routes/create_new_group_route.js')
const resultsroute = require('./Routes/results_route.js')
const signUpRoute = require('./Routes/SignUpRoute')
const ScreeningRoute = require('./Routes/screening_route.js')
const screening_form_route = require('./Routes/screeningform_route.js')
const protestRoute = require('./Routes/votingResult.js')
const joinRoute = require('./Routes/askJoin_route.js')
const votingRoute = require('./Routes/voting_route.js')
const meetingRoute = require('./Routes/MeetingRoute.js')
const chatroomRoute = require('./Routes/chatroom_route.js')
const dashboardRoute = require('./Routes/dashboard_route.js')
const createNewMeeting = require('./Routes/create_meeting_route.js')
const ratingROUTE = require('./Routes/rating_route.js')
const Landing = require('./Routes/groupsLand_route.js')
const logout_route = require('./Routes/logout_route.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000

const server = http.createServer(app)
const io = socketio(server)

app.use((req, res, next) => {
  req.io = io;
  return next();
});


app.get('/', async (req, res) => {
  
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/fundanamidb', (req, res) => {

})

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/signup', signUpRoute)
app.use('/screening', ScreeningRoute)
global.fetch = require('node-fetch')
app.use('/group', Landing)

app.use('/dashboard', dashboardRoute)
app.use('/voting', votingRoute)
app.use('/protest', protestRoute)
app.use(loginRoute)
app.use('/logout', logout_route)
app.use('/dashboard/voting', votingRoute)
app.use(joinRoute)
app.use('/newMeeting', createNewMeeting)
app.use('/screening_form', screening_form_route)
app.use('/chatroom', chatroomRoute)
app.use('/results', resultsroute)
app.use('/login', loginRoute)
app.use('/create_new_group', createNewGroupRoute)
app.use('/meeting', meetingRoute)
app.use('/rating', ratingROUTE)
app.use('/cdn', express.static('public'))

app.set('view engine', 'ejs')
// parse application/json
app.use(express.json())
app.use(express.static(__dirname + '/'))
// All routes that are not handles are sent to 404 error
app.set('view engine', 'ejs')
app.use((req, res, next) => {
  res.status(404)
  res.sendFile(path.join(__dirname, '/views', '404', '404.html'))
})

httpserver = server.listen(port, function () {
  console.log(`listening on port ${port.toString()}`)
})


module.exports = {
  app,
  httpserver,
  server
}