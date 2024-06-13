const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (userData) => {
    const { email, password, name } = userData;
    const user = new User({ email, password, name });
    await user.save();
    return user;
};

const login = async (userData) => {
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user._id);
    return { user, token };
};


const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user');
    }
};

module.exports = { register, login , getUserById };
