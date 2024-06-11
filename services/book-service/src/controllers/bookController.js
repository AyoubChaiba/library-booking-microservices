const bookService = require('../services/bookService');

const addBook = async (req, res) => {
    try {
        const book = await bookService.addBook(req.body);
        res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks();
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBook, getBooks };
