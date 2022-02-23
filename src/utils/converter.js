const Book = require("../models/Book");

function convertBookAddRequestDTOtoBook(dto) {
	return new Book(dto.name, dto.year, dto.author, dto.summary, 
		dto.publisher, dto.pageCount, dto.readPage, dto.reading);
}

module.exports = {
	convertBookAddRequestDTOtoBook
};
