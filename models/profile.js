const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
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
    defualt: ""
  },
  academicHistory: {
    type: Object,
    default: null,
  },
  employmentHistory: {
    type: Object,
    default: null,
  },
  skills: {
    type: Object,
    default: null,
  },
  college: {
    type: String,
  },
  major: {
    type: String,
  },
  achievements: {
    type: String,
    default: null,
  },
  gpa: {
    type: Number,
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
  },
  companies: {
    type: String,
  },
  dateofemployment: {
    type: Date,
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
});

profileSchema.index({ user: 1 }, { unique: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;