const express = require('express');
const router = express.Router();
const Message = require('../models/message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (data) => {
      // Ensure 'data' is an object with 'text' and 'senderName' properties
     // if (typeof data === 'string' && data.text && data.senderName) {
        // Create a new message document with the text and senderName received
        const message = new Message({
          text: data.text,
          senderName: data.senderName,
        });

        // Save the message to MongoDB
        message
          .save()
          .then(() => {
            // Log the saved message to the console
            console.log('Message saved to MongoDB:', message.text, 'From', message.senderName);

            // Emit the saved message (including senderName) to all connected clients
            io.emit('message', { text: message.text, senderName: message.senderName });
          })
          .catch((error) => {
            console.error('Error saving message:', error);
          });
     // } else {
       // console.error('Received invalid message data:', data);
    //  }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return router;
};
