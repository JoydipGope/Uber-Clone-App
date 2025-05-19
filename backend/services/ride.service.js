const rideModel = require('../models/ride.model');
const Captain = require('../models/captain.model');
const mapService = require('./maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getFare(pickup, destination) {
  
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    cng: 50,
    car: 100,
    motorcycle: 30,
  };

  const perKmRate = {
    cng: 10,
    car: 20,
    motorcycle: 8,
  };

  const perMinuteRate = {
    cng: 2,
    car: 5,
    motorcycle: 1.5,
  };
  console.log(distanceTime)

  const fare = {
    cng: Math.round(baseFare.cng + ((distanceTime.distance.value / 1000) * perKmRate.cng) + ((distanceTime.duration.value / 60) * perMinuteRate.cng)),
    car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
    motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle)),
  };

  return fare;
  
}

module.exports.getFare = getFare;


function getOtp(num){
  function generateOTP(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
  }
  return generateOTP(num);
}


module.exports.createRide = async ({
    user, pickup, destination, vehicleType 
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const fare = await getFare(pickup, destination);
  console.log(fare);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  })

  return ride;
}


module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and otp are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride is not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}