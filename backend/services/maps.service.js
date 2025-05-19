const axios = require('axios');
const captainModel = require('../models/captain.model');


module.exports.getAddressCoordinates = async (address) => { 
  const apiKey = process.env.GOOGLE_MAP_API; 
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return { 
        lat: location.lat, 
        lng: location.lng 
      };
    } else {
      //console.error('Google Maps API Error:', response.data.status, response.data.error_message);
      throw new Error('Unable to fetch coordinates');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }
  const apiKey = process.env.GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {

      if(response.data.rows[0].elements[0].status === 'ZERO_RESULT') {
        throw new Error('No route found');
      }
      return response.data.rows[0].elements[0];
    } else {
        throw new Error('Unable to fetch distance and time');
      }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error('query is required');
  }
  const apiKey = process.env.GOOGLE_MAP_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      return response.data.predictions;
    } else {
      throw new Error('Unable to fetch suggestions');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
  
//   const captains = await captainModel.find({
//     location: {
//         $geoWithin: {
//             $centerSphere: [ [ lng, lat ], radius / 6371000 ]
//           }
//         }
        
//       });
//       console.log("Looking for captains near:", { lng, lat });

//   return captains;
// }

module.exports.getCaptainsInTheRadius = async (lng, lat, radius) => {
  try {
    const captains = await captainModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: radius // in meters
        }
      }
    });

    console.log("Found captains near:", { lng, lat });
    return captains;
  } catch (error) {
    console.error("Error finding captains in radius:", error);
    return ;
  }
};
