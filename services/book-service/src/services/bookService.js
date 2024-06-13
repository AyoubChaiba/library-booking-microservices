const Book = require('../models/Book');

const addBook = async (bookData) => {
    const book = new Book(bookData);
    await book.save();
    return book;
};

const getBooks = async () => {
    return await Book.find();
};

const getBook = async (id) => {
    return await Book.findById(id);
};

module.exports = { addBook, getBooks, getBook };

