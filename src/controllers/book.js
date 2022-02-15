const service = require("../services/book");
const BookAddRequest = require("../dtos/BookAddRequest");
const NoNameException = require("../errors/NoNameException");
const Response = require("../dtos/Response");
const Status = require("../dtos/Status");
const InvalidReadPageValueException = require("../errors/InvalidReadPageValueException");
const BaseException = require("../errors/BaseException");
const converter = require("../utils/converter");
const GetBooksItemResponse = require("../dtos/GetBooksItemResponse");
const GetBookDetailResponse = require("../dtos/GetBookDetailResponse");
const IDNotFoundException = require("../errors/IDNotFoundException");
const BookUpdateRequest = require("../dtos/BookUpdateRequest");

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
			message = "Gagal menambahkan buku.";
			status = Status.FAIL;
			code = 400;

			if(err instanceof NoNameException) {
				message = message.concat(" Mohon isi nama buku");
			} else if (err instanceof InvalidReadPageValueException) {
				message = message.concat(" readPage tidak boleh lebih besar dari pageCount");
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
	const books = service
		.getBooks(name, reading, finished)
		.map(book => GetBooksItemResponse.fromBook(book));
	const data = new Response(Status.SUCCESS, null, { books });
	const response = h.response(data);

	response.code(200);
  
	return response;
}

function getBookById(request, h) {
	const { id } = request.params;
	let book = service.getBookById(id);

	let code = 200;
	let data = {};

	if (!book) {
		code = 404;
		data = new Response(Status.FAIL, "Buku tidak ditemukan");

		console.log(data);
	} else {
		book = GetBookDetailResponse.fromBook(book);
		data = new Response(Status.SUCCESS, null, { book });
	}

	const response = h.response(data);

	response.code(code);

	return response;
}

function deleteBookById(request, h) {
	const { id } = request.params;
	let status = Status.SUCCESS;
	let message = "Buku berhasil dihapus";
	let code = 200;

	try {
		service.deleteBookById(id);

	} catch (err) {
		if (err instanceof IDNotFoundException) {
			message = "Buku gagal dihapus. Id tidak ditemukan";
			status = Status.FAIL;
			code = 404;
		} else {
			message = "Buku gagal dihapus";
			status = Status.ERROR;
			code = 500;
		}
	}
  
	const response = h.response(new Response(status, message));

	response.code(code);
  
	return response;
}

function updateBookById(request, h) {
	let status = Status.SUCCESS;
	let message = "Buku berhasil diperbarui";
	let code = 200;

	try {
		const { id } = request.params;
		const dto = BookUpdateRequest.fromRequest(request.payload);

		service.updateBookById(id, dto.toChangesList());
	} catch (err) {
		if (err instanceof BaseException) {
			message = "Gagal memperbarui buku.";
			status = Status.FAIL;
			code = 400;

			if(err instanceof NoNameException) {
				message = message.concat(" Mohon isi nama buku");
			} else if (err instanceof IDNotFoundException) {
				message = message.concat(" Id tidak ditemukan");
				code = 404;
			} else if (err instanceof InvalidReadPageValueException) {
				message = message.concat(" readPage tidak boleh lebih besar dari pageCount");
			}
		} else {
			message = "Gagal memperbarui buku";
			status = Status.ERROR;
			code = 500;
		}
	}
  
	const response = h.response(new Response(status, message));
	response.code(code);
  
	return response;
}

module.exports = {
	addBook,
	getBooks,
	getBookById,
	deleteBookById,
	updateBookById
};
