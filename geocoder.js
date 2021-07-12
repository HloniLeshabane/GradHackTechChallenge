
const NodeGeocoder = require('node-geocoder');


const options = {
    provider: 'google',
   
    apiKey: process.env.maps_api, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
}

const geocoder = NodeGeocoder(options);

module.exports = geocoder