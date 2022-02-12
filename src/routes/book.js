const controller = require("../controllers/book");

module.exports = [
	{
		method: "POST",
		path: "/books",
		handler: controller.addBook
	},
	{
		method: "GET",
		path: "/books",
		handler: controller.getBooks
	},
];
