const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false // Do not return password by default
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving to database
userSchema.pre('save', async function() {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return;

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// Instance method to check if password matches
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
