/*
  {
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
  }
*/

const InvalidReadPageValueException = require("../errors/InvalidReadPageValueException");
const NoNameException = require("../errors/NoNameException");

/*
  {
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
  }
*/

class BookUpdateRequest {
	constructor(name, year, author, summary, 
		publisher, pageCount, readPage, reading) {
		this.name = name;
		this.year = year;
		this.author = author;
		this.summary = summary;
		this.publisher = publisher;
		this.pageCount = pageCount;
		this.readPage = readPage;
		this.reading = reading;
	}

	toChangesList() {
		const changes = {};

		for(const key in this) {
			if(this[key] !== undefined && typeof(this[key]) !== "function") {
				changes[key] = this[key];
			}
		}
    
		// if(this.name !== undefined)
		//   changes.name = this.name;
      
		// if(this.year !== undefined)
		//   changes.year = this.year;
      
		// if(this.author !== undefined)
		//   changes.author = this.author;
      
		// if(this.summary !== undefined)
		//   changes.summary = this.summary;

		// if(this.name !== undefined)
		//   changes.name = this.name;

		// if(this.name !== undefined)
		//   changes.name = this.name;

		// if(this.name !== undefined)
		//   changes.name = this.name;

		// if(this.name !== undefined)
		//   changes.name = this.name;

		return changes;
	}

	static fromRequest(request) {
		const { name, year, author, summary, 
			publisher, pageCount, readPage, reading } = request;
    
		if(!name)
			throw new NoNameException();

		if(readPage !== undefined && pageCount !== undefined && readPage > pageCount)
			throw new InvalidReadPageValueException();

		return new BookUpdateRequest(name, year, author, summary, 
			publisher, pageCount, readPage, reading);
	}
}

module.exports = BookUpdateRequest;
