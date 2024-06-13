const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
