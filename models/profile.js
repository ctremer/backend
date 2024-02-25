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
    required: true
  },
  lastName: {
    type: String,
    required: true
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
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  achievements: {
    type: String,
    default: null,
  },
  gpa: {
    type: Number,
    required: true,
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
    required: true,
  },
  companies: {
    type: String,
    required: true,
  },
  dateofemployment: {
    type: Date,
    required: true,
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