const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join', async (data)=> {
      const { userId, userType } = data;

      console.log(`User : ${userId} joined as ${userType}`);

      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } 
    });
    

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      // if (!location || !location.ltd || !location.lng) {
      //   return socket.emit('error', 'Invalid location data');
      // }
      if (!location || typeof location.lng !== 'number' || typeof location.lat !== 'number') {
    return socket.emit('error', 'Invalid location data');
  }

      // await captainModel.findByIdAndUpdate(userId, { 
      //   location: {
      //     ltd: location.ltd,
      //     lng: location.lng,
      //   } 
        
      // });

      try {
        await captainModel.findByIdAndUpdate(userId, { 
          location: {
            type: 'Point',
            coordinates: [location.lng, location.lat],
          } 
        });
        socket.emit('location-updated', { success: true });
      } catch (error) {
        console.error('Error updating captain location:', error);
        socket.emit('error', 'Failed to update location');
      }
      
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  
  console.log('Sending message to socket:', socketId, messageObject);
  
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error('Socket.io is not initialized.');
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
