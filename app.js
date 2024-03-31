const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const scholarShipRouter = require('./routes/api/scholarship');
const jobRouter = require('./routes/api/jobs');
const profileRouter = require('./routes/api/Profile');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user');
const Profile = require('./models/profile');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

connectDB();

// Your existing routes
app.use('/api/scholarship', scholarShipRouter);
app.use('/api/job', jobRouter);
app.use('/api/Profile', profileRouter);

const { resetPassword } = require('./controller/userController.js');

app.put('/api/user/edit/:id', resetPassword);

app.get('/api/user/fetch', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// New route for user signup
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password, confirmPassword, birthday } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if the user already exists
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Error duplicate user' });
    }

    // Create a new user
    user = new User({
      username,
      password,
      birthday,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create a corresponding profile
    const profile = new Profile({
      user: user._id,
      academicHistory: '',
      employmentHistory: '',
      skills: '',
    });

    // Save the profile to the database
    await profile.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New route for admin signup
app.post('/api/admin-signup', async (req, res) => {
  try {
    const { username, password, confirmPassword, birthday, role } = req.body;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if the user already exists
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Error duplicate user' });
    }

    // Create a new user
    user = new User({
      username,
      password,
      birthday,
      role,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create a corresponding profile
    const profile = new Profile({
      user: user._id,
      academicHistory: '',
      employmentHistory: '',
      skills: '',
    });

    // Save the profile to the database
    await profile.save();

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/admin-verify', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database based on the provided username
    const user = await User.findOne({ username });

    // Check if the user exists and the provided password is valid
    if (user && (await bcrypt.compare(password, user.password))) {
      // Check if the user has the 'admin' role
      if (user.role === 'admin') {
        res.status(200).json({ message: 'Verification successful' });
      } else {
        res.status(401).json({ error: 'User does not have admin privileges' });
      }
    } else {
      res.status(401).json({ error: 'Admin verification failed' });
    }
  } catch (error) {
    console.error('Admin verification error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/user/adminDelete/:id', async(req, res)=> {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    // Delete the user by ID
    await User.findByIdAndDelete(userId);

    // Also delete the corresponding profile
    await Profile.findOneAndDelete({ user: userId });

    res.status(200).json({ message: 'Account Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.delete('/api/user/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { password } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the provided password is valid
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Delete the user by ID
    await User.findByIdAndDelete(userId);

    // Also delete the corresponding profile
    await Profile.findOneAndDelete({ user: userId });

    res.status(200).json({ message: 'Account Deleted Successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Include your authentication routes
app.use('/auth', authRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => {
    console.log('Listening on port 5000!');
  });
}

module.exports = app;
