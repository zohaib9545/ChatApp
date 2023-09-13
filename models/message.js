const mongoose = require('mongoose');

// Define the schema for the message model
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sender:{
    type:String
  }
});

// Create the Message model using the schema
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
