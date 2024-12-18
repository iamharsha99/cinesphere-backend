const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateJWT } = require('../middleware/authenticateJWT');  


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
        const { name, username, password, dob, gender} = req.body;
        console.log(req.body);

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'Username already taken' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({ name, username, password: hashedPassword, dob, gender });
        await user.save();

        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: 'Invalid username' });
        }

        console.log(req.body);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid Password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.status(200).send({ token, data: user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/logout', authenticateJWT, (req, res) => {
    res.status(200).send({ message: 'User logged out successfully' });
});

module.exports = router;    
