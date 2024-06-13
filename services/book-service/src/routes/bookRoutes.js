const express = require('express');
const router = express.Router();
const { addBook, getBooks, getBook } = require('../controllers/bookController');
const { imageUpload } = require('../middleware/upload.js');

router.post('/', imageUpload.single('image'), addBook);
router.get('/', getBooks);
router.get('/:id', getBook);

module.exports = router;
