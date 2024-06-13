const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createOrder, getAllOrders, deleteOrder } = require('../controllers/orderController');

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getAllOrders);
router.delete('/:orderId', authMiddleware, deleteOrder);

module.exports = router;
