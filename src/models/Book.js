const { nanoid } = require("nanoid");

const ID_LENGTH = 16;

class Book {
  constructor(name, year, author, summary, publisher, 
    pageCount, readPage, reading) {
    this.id = nanoid(ID_LENGTH);
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = pageCount === readPage;
    this.reading = reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

/*
  data example
  {
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
  }
*/

module.exports = Book;