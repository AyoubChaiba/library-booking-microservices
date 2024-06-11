const axios = require('axios');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const response = await axios.get('http://localhost:3001/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
        });
        req.user = response.data.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
