const service = require("../services/book");
const BookAddRequest = require("../dtos/BookAddRequest");
const NoNameException = require("../errors/NoNameException");
const Response = require("../dtos/Response");
const Status = require("../dtos/Status");
const InvalidReadPageValueException = require("../errors/InvalidReadPageValueException");
const BaseException = require("../errors/BaseException");
const converter = require("../utils/converter");

function addBook(request, h) {
	let status = Status.SUCCESS;
	let message = "Buku berhasil ditambahkan";
	let code = 201;
	let data = {};

	try {
		const dto = BookAddRequest.fromRequest(request.payload);
		let book = converter.convertBookAddRequestDTOtoBook(dto);

		book = service.addBook(book);
		data = new Response(status, message, { id: book.id });
	} catch (err) {
		if (err instanceof BaseException) {
			message = "Gagal menambahkan buku. ";
			status = Status.FAIL;
			code = 400;

			if(err instanceof NoNameException) {
				message = message.concat("Mohon isi nama buku");
			} else if (err instanceof InvalidReadPageValueException) {
				message = message.concat("readPage tidak boleh lebih besar dari pageCount");
			}
		} else {
			message = "Buku gagal ditambahkan";
			status = Status.ERROR;
			code = 500;
		}

		data = new Response(status, message);
	}
  
	const response = h.response(data);
	response.code(code);
  
	return response;
}

/*
?name : Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query ini. 
		Contoh /books?name=”dicoding”, maka akan menampilkan daftar buku yang mengandung nama “dicoding” secara non-case sensitive (tidak peduli besar dan kecil huruf).
?reading : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). 
			Bila 1, maka tampilkan buku yang sedang dibaca (reading: true). Selain itu, tampilkan buku baik sedang dibaca atau tidak.
?finished : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). 
			Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true). Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.
*/

function getBooks(request, h) {
	const { name, reading, finished } = request.query;
	const books = service.getBooks(name, reading, finished);
	const data = new Response(Status.SUCCESS, null, { books });
	const response = h.response(data);

	response.code(200);
  
	return response;
}

module.exports = {
	addBook,
	getBooks
};
