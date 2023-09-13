// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const connectToDatabase = require('./database/connection');
const chatRoutes = require('./routes/chat');

// Create the Express app and server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Establish MongoDB connection
connectToDatabase()
  .then(() => {
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Define a route for '/chat'
    app.use('/chat', chatRoutes(io));

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
