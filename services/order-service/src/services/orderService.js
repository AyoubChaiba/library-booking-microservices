const Order = require('../models/Order');

const createOrder = async (userId, orderData) => {
    const order = new Order({ userId, ...orderData });
    await order.save();
    return order;
};

module.exports = { createOrder };
