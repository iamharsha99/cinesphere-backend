const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Register function
const register = async (req, res) => {
  try {
    const { name, username, password, dob, gender, profile_picture } = req.body;

    // Check if the username already exists
    const [existingUser] = await req.db.query('SELECT * FROM user WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).send({ error: 'Username already taken' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Use the provided profile picture or generate a default one
    const profilePicture = profile_picture || `https://robohash.org/${encodeURIComponent(username)}.jpg`;

    // Insert the new user into the database
    await req.db.query(
      'INSERT INTO user (name, username, password, dob, gender, profile_picture) VALUES (?, ?, ?, ?, ?, ?)',
      [name, username, hashedPassword, dob, gender, profilePicture]
    );

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists
    const [rows] = await req.db.query('SELECT * FROM user WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).send({ error: 'Invalid username' });
    }

    const user = rows[0];

    // Compare the hashed password
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid Password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET);

    res.status(200).send({
      token,
      data: {
        id: user.id,
        name: user.name,
        username: user.username,
        dob: user.dob,
        gender: user.gender,
        profile_picture: user.profile_picture,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: error.message });
  }
};

// Logout function
const logout = (req, res) => {
  res.status(200).send({ message: 'User logged out successfully' });
};

module.exports = { register, login, logout };