const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.user.id, req.body);
        res.status(201).json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await orderService.deleteOrder(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getAllOrders, deleteOrder };
