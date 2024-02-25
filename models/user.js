const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    default: 'user', // Default role is set to 'user'
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;