class GetBooksItemResponse {
	constructor(id, name, publisher) {
    this.id = id;
		this.name = name;
		this.publisher = publisher;
	}

	static fromBook(book) {
		return new GetBooksItemResponse(book.id, book.name, book.publisher);
	}
}

module.exports = GetBooksItemResponse;
