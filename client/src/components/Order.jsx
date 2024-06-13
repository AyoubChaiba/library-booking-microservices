import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, removeOrder } from '../store/ordersSlice';

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector(state => state.orders);

    console.log(orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const handleRemoveOrder = (orderId) => {
        dispatch(removeOrder(orderId));
    };

    const subtotal = orders.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
    const taxes = 120;
    const total = subtotal + taxes;

    return (
        <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order</h2>
            <ul className="space-y-4">
                {orders.length > 0 ? (
                    orders.map((item) => (
                        <li key={item._id} className="flex items-center">
                            <img src={item.book.image} alt={item.book.title} className="w-16 h-16 rounded-md" />
                            <div className="ml-4">
                                <h3 className="text-lg font-medium">{item.book.title}</h3>
                                <p className="text-gray-600">{item.book.author}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <span className="text-lg font-medium">{formatPrice(item.book.price)}</span>
                                <button
                                    onClick={() => handleRemoveOrder(item._id)} 
                                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </ul>
            <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                    <span className="text-lg font-medium">Subtotal</span>
                    <span className="text-lg font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-lg font-medium">Shipping</span>
                    <span className="text-lg font-medium">Free</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-lg font-medium">Taxes</span>
                    <span className="text-lg font-medium">{formatPrice(taxes)}</span>
                </div>
                <div className="flex justify-between mt-4">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-xl font-bold">CAD {formatPrice(total)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
