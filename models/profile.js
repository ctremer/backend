const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  academicHistory: {
    type: Array,
    default: Array,
  },
  employmentHistory: {
    type: Array,
    default: Array,
  },
  skills: {
    type: Array,
    default: Array,
  },
  college: {
    type: String,
    default: "",
  },
  major: {
    type: String,
    default: "",
  },
  achievements: {
    type: String,
    default: "",
  },
  gpa: {
    type: Number,
    default: null,
  },
  minor: {
    type: String,
    default: ""
  },
  yearattended: {
    type: Date,
    default: null,
  },
  yearcompletion: {
    type: Date,
    default: null,
  },
  jobtitle: {
    type: String,
    default: "",
  },
  companies: {
    type: String,
    default: "",
  },
  dateofemployment: {
    type: Date,
    default: null,
  },
  responsiblities: {
    type: String,
    default: ""
  },
  achievements: {
    type: String,
    default: ""
  },
  certifications: {
    type: String,
    default: ""
  },
  submittedessays: {
    type: Array,
    default: Array
  },
  submittedjobapplications: [
    {
      jobid: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
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
  profilepicture: {
    type: String,
    default: ""
  }
});
profileSchema.index({ user: 1 }, { unique: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;