const controller = require("../controllers/book");

module.exports = [
	{
		method: "POST",
		path: "/books",
		handler: controller.addBook
	},
];
