const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../shared/db-connection');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('../shared/error-handler'));

connectDB();

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' }
});
userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Cannot find user');

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'your-secret-key');
      res.json({ token });
    } else {
      res.status(403).send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3001, () => console.log('Auth Service running on port 3001'));