const request = require('supertest')('http://216.10.245.166');
const expect = require('chai').expect;
const faker = require('@faker-js/faker').faker;

describe('/POST AddBook', () => {
  const url = "/Library/Addbook.php";

  //Set random faker values for request body to avoid duplication
  let authorName = faker.name.firstName() + " " + faker.name.lastName();
  process.env.AUTHOR_NAME = authorName;
  let aisle = faker.datatype.number({
    'min': 1,
    'max': 99999
  });;
  let isbn = faker.random.alphaNumeric(5);
  let bookId = isbn + aisle;
  let bookName = "Learn Appium Automation with Java";

  it('Should verify if book is successfully added', () => {

    const requestBody = {
      name: bookName,
      isbn: isbn,
      aisle: aisle,
      author: authorName,
    };
    //Print the request body
    console.log(requestBody);
    process.env.BOOK_NAME = bookName;
    process.env.ISBN = isbn;
    process.env.AISLE = aisle;

    return request
    .post(url)
    .set('Content-Type', 'application/json')
    .send(requestBody)
    .then((response) => {
      //Verify if status code is 200
      expect(response.statusCode).to.be.eql(200);
      expect((response) => {
        //Verify 'successfully added' message on the response JSON
        //Verify if the book 'ID' is the ISBN value
        res.body.should.containEql({
          Msg: 'successfully added',
          ID: bookId,
        })
      })
      //Print the response body
      console.log(response.body);
      });
  });
});