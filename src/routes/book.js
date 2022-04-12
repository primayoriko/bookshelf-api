const handler = require("../handlers/book");

module.exports = [
	{
		method: "POST",
		path: "/books",
		handler: handler.addBook
	},
	{
		method: "GET",
		path: "/books/{id}",
		handler: handler.getBookById
	},
	{
		method: "GET",
		path: "/books",
		handler: handler.getBooks
	},
	{
		method: "DELETE",
		path: "/books/{id}",
		handler: handler.deleteBookById
	},
	{
		method: "PUT",
		path: "/books/{id}",
		handler: handler.updateBookById
	},
];
