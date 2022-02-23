const BaseException = require("./BaseException");

class IDNotFoundException extends BaseException {
	constructor() {
		super("");
	}
}

module.exports = IDNotFoundException;
