require("dotenv").config();
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MBX_ACCESS_TOKEN });

async function geoCoder(location){
  try {
    let response = await geocodingClient.forwardGeocode({
      query: location,
      limit: 1
    })
      .send()
      console.log(response.body.features[0].geometry.coordinates)
      // TypeError Cannot read property 'geometry' of undefined
  } catch (error) {
    console.log(error.message)
  }
  
    
}

geoCoder('whdjhjhff, Russia')