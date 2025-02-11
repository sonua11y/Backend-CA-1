const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sriprananthiindupalli', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true }
});

const User = mongoose.model('User', userSchema);

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password, dateOfBirth } = req.body;

  // Input Validation
  if (!username) {
    return res.status(400).send('Username cannot be empty');
  }
  if (!email) {
    return res.status(400).send('Email cannot be empty');
  }
  if (!password || password.length < 8 || password.length > 16) {
    return res.status(400).send('Password length should be between 8 and 16 characters');
  }
  if (!dateOfBirth) {
    return res.status(400).send('Date of Birth is required');
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create and save new user
    const newUser = new User({
      username,
      email,
      password,
      dateOfBirth
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000');
});
