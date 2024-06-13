import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addOrder } from '../store/ordersSlice';

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, orders } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleAddOrder = bookId => {
        dispatch(addOrder(bookId)).then(() => {
            dispatch(fetchBooks());
        });
    };

    const isBookInOrder = bookId => {
        return orders.some(order => order.bookId === bookId);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Book List</h2>
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map(book => (
                    <div key={book.id} className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center">
                        <img src={book.image} alt={book.title} className="w-64 h-64 rounded-md mb-4 object-cover" />
                        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                        <p className="text-gray-600 mb-2">{book.author}</p>
                        <p className="text-gray-800 mb-4">{formatPrice(book.price)}</p>
                        <button
                            onClick={() => handleAddOrder(book.id)}
                            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
                        >
                            {isBookInOrder(book.id) ? 'Already Ordered' : 'Add to Order'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
