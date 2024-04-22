const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const result = validateNewUser(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error.details[0].message });
    }

    const { username, password, confirmPassword, birthday } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Error duplicate user" });
    }

    user = new User({
      username,
      password,
      birthday,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Send user data in the response
    const userData = {
      _id: user._id, // assuming you have an _id field in your User model
      username: user.username,
      birthday: user.birthday,
      // Add any other user data you want to include in the response
    };
    console.log('data', userData)
    res.status(200).json({
      message: "Signup successful",
      user: userData,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const adminDelete = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    // Delete the user by ID
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Include the role in the response
    res.status(200).json({ message: "Login successful", role: user.role, user: user._id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const validateNewUser = (data) => {
  // Implement your validation logic here
  // Example using Joi for validation:
  const Joi = require("joi");

  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    birthday: Joi.date().iso().required(),
  });

  return schema.validate(data);
};

const resetPassword = async (req, res) => {
  try {
    const { id } = req.params; 
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Retrieve the user from the database based on the provided id
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate the current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    // Update the password if the current password is valid
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user data to the database
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetch = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

module.exports = { signup, login, fetch, resetPassword, adminDelete };
