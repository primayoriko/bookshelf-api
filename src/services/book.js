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

function getBooks(name=null, reading=null, finished=null) {
	return books.filter(book => 
		(!name || book.name.includes(name)) && (!reading || book.reading === reading) && 
		(!finished || book.finished === finished));
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
