import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { fetchOrders } from '../store/ordersSlice'; // Import fetchOrders action
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            dispatch(fetchOrders());
        }
    }, [token, dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        navigate('/login');
        toast.success('Logged out successfully', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="text-white text-xl">Home</Link>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        {!token ? (
                            <>
                                <li><Link to="/login" className="text-white">Login</Link></li>
                                <li><Link to="/register" className="text-white">Register</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/order" className="text-white">Order {orders.length > 0 && <span className="text-red-500 ml-1">{orders.length}</span>}</Link></li>
                                <li><Link to="/booklist" className="text-white">Book List</Link></li>
                                <li><Link to="/AddBook" className="text-white">Add Book</Link></li>
                                <li>
                                    <button onClick={handleLogout} className="text-white">Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
