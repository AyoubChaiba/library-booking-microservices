const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (userData) => {
    const { username, password } = userData;
    const user = new User({ username, password });
    await user.save();
    return user;
};

const login = async (userData) => {
    const { username, password } = userData;
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user._id);
    return { user, token };
};

module.exports = { register, login };
