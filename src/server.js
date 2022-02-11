const Hapi = require("@hapi/hapi");
const bookRoutes = require("./routes/book");
 
init();
 
async function init () {
	const server = Hapi.server({
		port: 5000,
		host: "localhost"
	});

	server.route(bookRoutes);

	await server.start();
	console.log(`Server successfully run at ${server.info.uri}`);
}
