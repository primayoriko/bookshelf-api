/*
  {
    "id": "aWZBUW3JN_VBE-9I",
    "name": "Buku A Revisi",
    "year": 2011,
    "author": "Jane Doe",
    "summary": "Lorem Dolor sit Amet",
    "publisher": "Dicoding",
    "pageCount": 200,
    "readPage": 26,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-05T06:14:28.930Z",
    "updatedAt": "2021-03-05T06:14:30.718Z"
  }
*/

class GetBookDetailResponse {
	constructor(id, name, year, author, summary, publisher, 
		pageCount, readPage, finished, reading, insertedAt, updatedAt) {
		this.id = id;
		this.name = name;
		this.year = year;
		this.author = author;
		this.summary = summary;
		this.publisher = publisher;
		this.pageCount = pageCount;
		this.readPage = readPage;
		this.finished = finished;
		this.reading = reading;
		this.insertedAt = insertedAt;
		this.updatedAt = updatedAt;
	}

	static fromBook(book) {
		const { id, name, year, author, summary, publisher, pageCount, 
			readPage, finished, reading, insertedAt, updatedAt } = book;
		return new GetBookDetailResponse(id, name, year, author, summary, publisher, 
			pageCount, readPage, finished, reading, insertedAt, updatedAt);
	}
}

module.exports = GetBookDetailResponse;
