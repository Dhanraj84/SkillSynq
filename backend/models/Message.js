const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email']
  },
  message: {
    type: String,
    required: [true, 'Message cannot be empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
