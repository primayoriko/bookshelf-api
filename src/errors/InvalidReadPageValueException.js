const BaseException = require("./BaseException");

class InvalidReadPageValueException extends BaseException {
	constructor() {
		super("");
	}
}

module.exports = InvalidReadPageValueException;
