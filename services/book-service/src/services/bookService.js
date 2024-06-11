const Book = require('../models/Book');

const addBook = async (bookData) => {
    const book = new Book(bookData);
    await book.save();
    return book;
};

const getBooks = async () => {
    return await Book.find();
};

module.exports = { addBook, getBooks };
