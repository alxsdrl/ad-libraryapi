const request = require('supertest')('http://216.10.245.166');
const expect = require('chai').expect;

const AUTHOR_NAME = process.env.AUTHOR_NAME;

describe('/GET GetBook', () => {
	const url = `/Library/GetBook.php?AuthorName=${AUTHOR_NAME}`;

	it('Should verify if status code is 200', () => {
		return request.get(url)
		.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.be.eql(200);
			});
	});

  it('Should verify the details of the added book in JSON response', () => {
		return request.get(url)
		.set('Content-Type', 'application/json')
			.then((response) => {
				expect((response) => {
					response.body.should.containEql({
						book_name: 'Learn Appium Automation with Java',
						isbn: 'h886o',
						aisle: '295',
					})
				})
      //Print the response body
      console.log(response.body);
			});
	});
});