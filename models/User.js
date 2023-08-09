const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    min: [3, 'Please enter a username greater than 2 characters'],
    max: [30, 'Username should not exceed 30 characters'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    min: [6, 'Password should not be less than 6 characters'],
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
