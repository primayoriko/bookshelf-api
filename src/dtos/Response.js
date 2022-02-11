class Response {
	constructor(status, message=null, data=null) {
		this.status = status;

		if(message)
			this.message = message;

		if(data)
			this.data = data;
	}
}

module.exports = Response;
