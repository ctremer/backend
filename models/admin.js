const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
    default: 'admin', // Default role is set to 'admin'
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;