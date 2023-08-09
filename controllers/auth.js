const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: 'Please enter username and password' });
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'Username already exists. Please enter a different one' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: passwordHash });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: 'Please enter username and password' });
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password); //used compareSync instead of adding await

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const token = jwt.sign({ username, id: user._id }, process.env.JWT_SECRET);

    // jwt.sign(
    //   { username, id: user._id },
    //   process.env.JWT_SECRET,
    //   {},
    //   (err, token) => {
    //     if (err) throw err;
    //     res.cookie('token', token).json('ok');
    //   }
    // );

    delete user.password; //deleting the password so it does not get sent to the front end

    res
      .status(200)
      .cookie('token', token)
      .json({ id: user._id, username: user.username, token }); // Send the token in the response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER CREDENTIALS
const getUserCredentials = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      // Handle the case when the token is missing
      return res.status(401).json({ error: 'Token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) throw err;
      res.status(200).json(decodedToken); // Send the decoded token to the client
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie('token')
      .status(200)
      .json({ msg: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserCredentials, logoutUser };
