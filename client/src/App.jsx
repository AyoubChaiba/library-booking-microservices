import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Order from './components/Order';
import BookList from './components/BookList';
import Navbar from './components/Navbar';
import AddBook from './components/AddBook';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<Order />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/AddBook" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
