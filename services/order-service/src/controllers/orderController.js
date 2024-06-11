const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.user.id, req.body);
        res.status(201).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder };
