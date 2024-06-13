const Order = require('../models/Order');
const axios = require('axios');

const createOrder = async (userId, orderData) => {
    try {
        const userResponse = await axios.get(`http://localhost:3001/api/auth/${userId}`);
        const bookResponse = await axios.get(`http://localhost:3003/api/books/${orderData.bookId}`);

        if (!userResponse.data.user) {
            throw new Error('User not found');
        }

        if (!bookResponse.data.book) {
            throw new Error('Book not found');
        }

        let order = await Order.findOne({ userId, book: orderData.bookId });

        if (order) {
            order.quantity += orderData.quantity || 1;
        } else {
            order = new Order({ userId, book: orderData.bookId, quantity: orderData.quantity || 1 });
        }

        await order.save();
        return order;
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};

const getAllOrders = async () => {
    try {
        const orders = await Order.find();
        const ordersWithDetails = await Promise.all(orders.map(async order => {
            const userResponse = await axios.get(`http://localhost:3001/api/auth/${order.userId}`);
            const bookResponse = await axios.get(`http://localhost:3003/api/books/${order.book}`);
            return {
                ...order.toObject(),
                user: userResponse.data.user,
                book: {
                    id: bookResponse.data.book.id,
                    title: bookResponse.data.book.title,
                    author: bookResponse.data.book.author,
                    image: `http://localhost:3003/image/${bookResponse.data.book.image}`,
                    price: bookResponse.data.book.price,
                    quantity: bookResponse.data.book.quantity,
                }
            };
        }));
        return ordersWithDetails;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
    }
};

const deleteOrder = async (orderId) => {
    try {
        await Order.findByIdAndDelete(orderId);
    } catch (error) {
        throw new Error('Error deleting order: ' + error.message);
    }
};

module.exports = { createOrder, getAllOrders, deleteOrder };
