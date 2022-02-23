const { books } = require("../data/data");
const IDNotFoundException = require("../errors/IDNotFoundException");
const InvalidReadPageValueException = require("../errors/InvalidReadPageValueException");

function addBook(book) {
	books.push(book);
	return book;
}

function getBooks(name=null, reading=null, finished=null) {
	if(reading !== null)
		reading = +reading === 1;

	if(finished !== null)
		finished = +finished === 1;

	return books.filter(book => 
		(name === null || book.name.toLowerCase().includes(name.toLowerCase())) && 
		(reading === null || book.reading === reading) && (finished === null || book.finished === finished));
}

function getBookById(id) {
	const res = books.filter(book => book.id === id);
	return res.length? res[0] : null;	
}

function deleteBookById(id) {
	for(const idx in books) {
		if(books[idx].id === id) {
			books.splice(idx, 1);
			return;
		}
	}

	throw new IDNotFoundException();
}

function updateBookById(id, changes) {
	let book = null;
	for(const bk of books) {
		if(bk.id === id) {
			book = bk;
			break;
		}
	}

	if(!book)
		throw new IDNotFoundException();

	for(const key in changes) {
		book[key] = changes[key];
	}

	if(book.readPage > book.pageCount)
		throw new InvalidReadPageValueException();

	book.finished = book.readPage === book.pageCount;
	book.updatedAt = new Date().toISOString();
}

module.exports = {
	addBook,
	getBooks,
	getBookById,
	deleteBookById,
	updateBookById
};
