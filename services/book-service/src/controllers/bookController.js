const bookService = require('../services/bookService');

const addBook = async (req, res) => {
    try {
        const image = req?.file?.filename;
        const bookData = { image, ...req.body };
        const book = await bookService.addBook(bookData);
        res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getBooks = async (req, res) => {
    try {
        const books = await bookService.getBooks();

        const booksWithImages = books.map(book => ({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            image: `http://localhost:3003/image/${book.image}`,
        }));

        res.status(200).json({ books: booksWithImages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookService.getBook(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        const imageURL = `http://localhost:3003/uploads/image/${book.image}`;

        res.status(200).json({ book, imageURL });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBook, getBooks, getBook };
