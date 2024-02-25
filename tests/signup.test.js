const request = require('supertest');
const app = require('../app.js');
const User = require('../models/user.js');
const Profile = require('../models/profile.js');

describe('POST /api/signup', () => {

  let userId;
  let profileId;

  // Cleanup function to delete the created user and profile
  const cleanup = async () => {
    if (userId) {
      await User.findByIdAndDelete(userId);
    }

    if (profileId) {
      await Profile.findByIdAndDelete(profileId);
    }
  };

  // Calls cleanup after each test to delete new user/profile that was created
  afterEach(async () => {
    await cleanup();
  });

  it('creates a new user and a corresponding profile', async () => {
    const userData = {
      username: 'testuser2',
      password: 'testpassword',
      confirmPassword: 'testpassword',
      birthday: '1990-01-01',
    };

    // Make a request to your signup endpoint
    const response = await request(app)
      .post('/api/signup')
      .send(userData);

    // Check the response status
    expect(response.status).toBe(200);

    // Check that the user is created
    const user = await User.findOne({ username: userData.username });
    expect(user).toBeTruthy();
    userId = user._id;

    // Check that the profile is created with the correct user ID
    const profile = await Profile.findOne({ user: userId });
    expect(profile).toBeTruthy();
    profileId = profile._id;
    expect(profile.user.toString()).toBe(userId.toString());
  });

  it('returns an error if passwords do not match', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
      confirmPassword: 'differentpassword',
      birthday: '1990-01-01',
    };

    const response = await request(app)
      .post('/api/signup')
      .send(userData);

    // Check the response status
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Passwords do not match');
  });

  it('returns an error for duplicate users', async () => {
    // Use an existing user
    const existingUser = {
      username: 'ctremer',
      password: 'testpassword',
      confirmPassword: 'testpassword',
      birthday: '1990-01-01',
    };

    const response = await request(app)
      .post('/api/signup')
      .send(existingUser);

    // Check the response status
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Error duplicate user');
  });

  it('returns an error for incorrect date format', async () => {
    const incorrectDate = {
      username: 'testuser',
      password: 'testpassword',
      confirmPassword: 'testpassword',
      birthday: '1990-01-MM',
    };

  const response = await request(app)
    .post('/api/signup')
    .send(incorrectDate);
    expect(response.status).toBe(400);
  })
});
