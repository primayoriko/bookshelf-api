const Book = require("../models/Book");
const { books } = require("../data/data");

function addBook(book) {
	books.push(book);
	return book;
}

function updateBook() {

}

function deleteBook() {

}

function getBooks() {

}

function getBookById(id) {

}

module.exports = {
	addBook,
	deleteBook,
	updateBook,
	getBooks,
	getBookById
};
