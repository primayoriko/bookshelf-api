const Book = require("../models/Book");
const { books } = require("../data/data");
const IDNotFoundException = require("../errors/IDNotFoundException");

function addBook(book) {
	books.push(book);
	return book;
}

function getBooks(name=null, reading=null, finished=null) {
	return books.filter(book => 
		(!name || book.name.includes(name)) && (!reading || book.reading === reading) && 
		(!finished || book.finished === finished));
}

function getBookById(id) {
	const res = books.filter(book => book.id === id);
	return res.length? res[0] : null;	
}

function deleteBookById(id) {
	for(idx in books) {
		if(books[idx].id === id) {
			books.splice(idx, 1);
			return;
		}
	}

	throw new IDNotFoundException();
}

function updateBook() {

}

module.exports = {
	addBook,
	getBooks,
	getBookById,
	deleteBookById,
	updateBook
};
