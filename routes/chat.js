const express = require('express');
const router = express.Router();
const Message = require('../models/message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', (text) => {
      // Ensure 'text' is a string
      if (typeof text === 'string') {
        // Create a new message document with the text received
        const message = new Message({ text });
    
        // Save the message to MongoDB
        message.save()
          .then(() => {
            // Log the saved message to the console
            console.log('Message saved to MongoDB:', message.text);
            
            // Emit the saved message to all connected clients
            io.emit('message', message.text);
          })
          .catch((error) => {
            console.error('Error saving message:', error);
          });
      } else {
        console.error('Received invalid message data:', text);
      }
    });
    
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });


  return router;
};
