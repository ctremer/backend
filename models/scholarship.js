const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scholarShipSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  openDate: {
    type: Date,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  amtPerAward: {
    type: Number,
    default: null
  },
  awardsAvail: {
    type: Number,
    default: null
  },
  qualifications: {
    type: String,
    default: ""
  },
  submittedessays: {
    type: Array,
    default: Array
  },
  photo: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('ScholarShip', scholarShipSchema);
