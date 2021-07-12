'use strict'

const path = require('path')
const express = require('express')


const markers = [];

Socketio.on("connection", socket => {
    for(let i = 0; i < markers.length; i++) {
        socket.emit("marker", markers[i]);
    }
    socket.on("marker", data => {
        markers.push(data);
        Socketio.emit("marker", data);
    });
});

function displayRoute(origin, destination, service, display) {
    service.route(
      {
        origin: origin,
        destination: destination,
        waypoints: [
          { location: "Adelaide, SA" },
          { location: "Broken Hill, NSW" },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true,
      },
      (result, status) => {
        if (status === "OK" && result) {
          display.setDirections(result);
        } else {
          alert("Could not display directions due to: " + status);
        }
      }
    );
  }
  

  
  function computeTotalDistance(result) {
    let total = 0;
    const myroute = result.routes[0];
  
    if (!myroute) {
      return;
    }
  
    for (let i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById("total").innerHTML = total + " km";
  }