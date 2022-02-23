const controller = require("../controllers/book");

module.exports = [
	{
		method: "POST",
		path: "/books",
		handler: controller.addBook
	},
	{
		method: "GET",
		path: "/books/{id}",
		handler: controller.getBookById
	},
	{
		method: "GET",
		path: "/books",
		handler: controller.getBooks
	},
	{
		method: "DELETE",
		path: "/books/{id}",
		handler: controller.deleteBookById
	},
	{
		method: "PUT",
		path: "/books/{id}",
		handler: controller.updateBookById
	},
];
