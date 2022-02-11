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

module.exports = {
	addBook
};
