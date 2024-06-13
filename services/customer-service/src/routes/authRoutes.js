const express = require('express');
const router = express.Router();
const { register, login, verify, getUserById } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authMiddleware, verify);
router.get('/:id', getUserById);

module.exports = router;
