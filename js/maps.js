
var socket = io({ transports: ['websocket'], upgrade: false });
//var socket = io();
let positions = []


function initMap() {

  const options = {
    center: { lat: -26.1953, lng: 28.0337 },
    zoom: 8
  }
  //console.log(group_name)
  map = new google.maps.Map(document.getElementById('map'), options)


  google_map = map


  socket.on('connect', function () {
    console.log('connected to server')
    socket.emit('join', group_name)
  })

  socket.on("connect_error", function (err) {
    console.log(`connect_error due to ${err.message}`);
  });

  socket.on('disconnect', function () {
    console.log('Disconnection')
    socket.disconnect()
    socket.close()
  })


  socket.on('done', function () {
    setTimeout(calculateAveragePosition, 3000)
  })

  socket.on('add_location_searched', function (latlong) {
   console.log(latlong)
    const image =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      new google.maps.Marker({
        position: {lat: latlong.lat,lng:latlong.lng},
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW	,
          scale: 8,
        },
        draggable: true,
        map: map,
      });
    document.getElementById("suggestion").innerHTML = "Last suggestion:" +latlong.formattedAddress ;
  })


  socket.on('add_location', function (latlong) {
    console.log(latlong.country)
    if (latlong.country != "South Africa") {
      /*
            Swal.fire({
              icon: 'info',
              title: 'Woah! seems like you\'re way off!',
              text: 'Search outside of South Africa'
            })*/

    }
    else {
      const marker = new google.maps.Marker({
        position: { lat: latlong.lat, lng: latlong.lng },
        label: latlong.person,
        animation: google.maps.Animation.DROP,
        title: latlong.person,
        map: map,

      })
      console.log('About to push latitude' + latlong.lat)
      console.log('About to push longitude' + latlong.lng)
      positions.push({
        lat: latlong.lat,
        lng: latlong.lng
      })
    }
  })


  //new AutocompleteDirectionsHandler(map)

}

function watchLiveLocation(){

  function success(pos) {
    var crd = pos.coords;
    console.log(crd.latitude)
    new google.maps.Marker({
      position: { lat: crd.latitude.lat, lng: crd.longitude },
      animation: google.maps.Animation.DROP,
      
      map: map,

    })
  
    /*if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
      console.log('Congratulations, you reached the target');
      navigator.geolocation.clearWatch(id);
    }*/
  }
  
  function error(err) {
    console.log('ERROR(' + err.code + '): ' + err.message);
  }
  
  target = {
    latitude : 0,
    longitude: 0
  };

  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
    frequency:15000
  };
 

  id = navigator.geolocation.watchPosition(success, error, options);
}

function calculateAveragePosition() {
  console.log('buzz em in')
  let avglng = 0
  let avglat = 0
  let n = positions.length
  positions.forEach(pos => {
    avglat = avglat + pos.lat
    avglng = avglng + pos.lng
  })

  avglat = avglat / n
  avglng = avglng / n

  console.log(n)
  console.log(avglat)
  console.log(avglng)


  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
  new google.maps.Marker({
    position: { lat: avglat, lng: avglng },
    icon: svgMarker,
    map: map,
  });

}

//window.addEventListener('click', e => { e.stopPropagation(); }, true);
let findbtn = document.getElementById('findbtn')
findbtn.addEventListener('click', function (e) {

  e.preventDefault()
  let search_address = document.getElementById('address_field').value

  if (search_address == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Empty Address Search'
    })
  } else {
    socket.emit('location', search_address, group_name)
  }

  return false;
})


