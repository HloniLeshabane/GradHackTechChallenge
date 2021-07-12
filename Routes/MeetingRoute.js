'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()
const NodeGeocoder = require('node-geocoder');
const db_f = require('../db_functions.js')
const check = require('../cookie_check.js').check
const options = {
  provider: 'google',
  apiKey: process.env.maps_api, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);
async function EmitLocations(people, io) {

  people.Result.recordset.forEach(async (person) => {
    const res = await geocoder.geocode(person.Address + 'South Africa');
    //console.log(res)

    io.emit('add_location', {
      country: res[0].country,
      lat: res[0].latitude,
      lng: res[0].longitude,
      person: person.FirstName
    })
  })
  console.log('About to emit done')
  await io.emit('done', {
    message: 'Done sending all user locations'
  })

}


// Using callback

router.get('/:groupname',check, async (req, res) => {
  var io = req.io
  
  console.log('connection in socket:' + !('connection' in io.sockets._events))
  


  //if(!('connection' in io.sockets._events)) {
    const people = await db_f.fetchStudentsAddressinGroup(req.params.groupname)
    io.on('connection', async (socket) => {
      console.log('we meeting with: ' + socket.id)
  
      socket.on('disconnect',function(){
        console.log('Disconnection')
        socket.disconnect();
      })

      socket.on('move circle',(latlng)=>{
        io.to(latlng.group_name).emit('move black circle', {
          lat: latlng.lat,
          lng: latlng.lng
        })
      })
  
      socket.on('join',async(room)  => {
        //console.log(socket.clients)
        
        const ids = await io.allSockets()
        console.log(ids.has(socket.id))
        const res = await io.in(room).allSockets()
        console.log('has socket:' +res.has(socket.id))
        
  
        console.log('Joined room:' + room)
        socket.join(room)
      })
  
      await EmitLocations(people, socket)
      socket.on('location', async (loc, group_name) => {
        const res = await geocoder.geocode(loc);
        console.log(res)
        io.to(group_name).emit('add_location_searched', {
          country: res[0].country,
          lat: res[0].latitude,
          lng: res[0].longitude,
          formattedAddress:res[0].formattedAddress
        })
  
        io.to(group_name).emit('add_location_searched', {
          country: res[0].country,
          lat: res[0].latitude,
          lng: res[0].longitude,
          formattedAddress:res[0].formattedAddress
        })
  
      })
  
    })
  //}

  res.render('meeting', {
    people: people.Result.recordset,
    groupname: req.params.groupname
  })
})

module.exports = router
