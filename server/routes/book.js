const express = require('express');
const router = express.Router();

// Controllers
const booksController = require('../controllers/books');

// Routes
router.post('/', booksController.createBook);
router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;