const Hapi = require("@hapi/hapi");
const bookRoutes = require("./routes/book");

const start = async () => {
	const server = Hapi.server({
		port: 5000,
		host: "localhost",
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

	server.route(bookRoutes);

	await server.start();
	console.log(`Server successfully run at ${server.info.uri}`);
};

start();
