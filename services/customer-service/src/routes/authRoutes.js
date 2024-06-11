const express = require('express');
const router = express.Router();
const { register, login, verify } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authMiddleware, verify);

module.exports = router;
