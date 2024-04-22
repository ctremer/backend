const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  employer: {
    type: String,
    required: true
  },
  payType: {
    type: String,
    default: "N/A"
  },
  salary: {
    type: Number,
    default: null
  },
  hourlyPay: {
    type: Number,
    default: null
  },
  schedule: {
    type: String,
    required: true
  },
  weeklyHours: {
    type: Number,
    required: true
  },
  reqQual: {
    type: String,
    required: true
  },
  prefQual: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  remote: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: "USA"
  },
  submittedapplications: [
    {
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
      },
      name: {
        type: String,
        default: ""
      },
      dob: {
        type: Date,
        default: null
      },
      essay1: {
        type: String,
        default: ""
      },
      essay2: {
        type: String,
        default: ""
      }
    }
  ],
  photo: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('Job', jobSchema);
