const BaseException = require("./BaseException");

class NoNameException extends BaseException {
	constructor() {
		super("");
	}
}

module.exports = NoNameException;
