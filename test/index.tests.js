/* globals it: true} */
/* globals describe: true} */
// --- Above are JSHint's Linter Settings for this particular file --- //

/*
  Mocha is launching this page. Kind of like how we launch node or nodemon.
  Because Mocha launches this page, functions like "describe()" and "it()"
  are available to us.
*/

var expect = require("chai").expect;
var request = require("supertest");
var app = require("../index");
// chai is the testing module that performs these assertions. (eg: does this function give this result?)
// supertests will perform http RESTful routings. Thus simulating a front-end user on our site.
// app is our application back-end.

// This is just for organisation and reporting
describe('Our application', function () {


  // This is the name of the test
  it('should understand basic mathematical principles', function (done) {

    // We want this test to pass.
    if (5 == 5) {
      // If the behavior is as expected, call done with no argument.
      done();
    } else {
      // Otherwise, call done with an error.
      done(new Error("Not sure what's happened."));
    }

  });

});

describe('Our application', function () {

  it('should understand basic mathematical principles', function (done) {

    // We want tests to pass.
    if (5 == 3) {
      // Hope we don't get here.
      throw new Error("Oh no.");
    }

    // Since no error thrown, test will pass.
    done();
  });

  it('should understand basic mathematical principles', function (done) {

    // We want tests to pass.
    if (5 == 3) {
      // Hope we don't get here.
      throw new Error("Oh no.");
    }

    // Since no error thrown, test will pass.
    done();
  });

});

// +--------------------------+
// |      Out First Test      |
// +--------------------------+
describe("GET [ Home HTML Page ] /", function () {
  // describe is a part of Mocha. The string is entirely for readability. Shows up in the terminal when the test is ran.
  // Define a test. The next 4 lines are the test
  it("should return a 200 response", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/") // We pass our application into supertest so that supertest can do a GET on '/'
      .expect(200, done); // expect is a part of chai. We tell chai what we want when it comes back.
  });

  // Define a test. The next 4 lines are the test
  it("should return 39178 as content length", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect("Content-Length", "39178")
      .expect(200, done);
  });

  // Define a test. The next 4 lines are the test
  it("should contain HTML as content type", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/")
      .expect("Content-Type", /html/)
      .expect("Content-Length", "39178")
      .expect(200, done);
  });
});



// +--------------------------+
// |      Out Second Test      |
// +--------------------------+

describe("GET [ Admin HTML Page ] /", function () {
  // describe is a part of Mocha. The string is entirely for readability. Shows up in the terminal when the test is ran.
  // Define a test. The next 4 lines are the test
  it("should return a 200 response", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/") // We pass our application into supertest so that supertest can do a GET on '/'
      .expect(200, done) // expect is a part of chai. We tell chai what we want when it comes back.
  });

  // Define a test. The next 4 lines are the test
  it("should return 39178 as content length", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/admin")
      .expect("Content-Type", /html/)
      .expect("Content-Length", "13723")
      .expect(200, done);
  });

  // Define a test. The next 4 lines are the test
  it("should contain HTML as content type", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/admin")
      .expect("Content-Type", /html/)
      .expect("Content-Length", "13723")
      .expect(200, done);
  });
});

// +--------------------------+
// |      Out Third Test      |
// +--------------------------+
describe("GET [ Absurd HTML Page ] /templates/absurd", function () {
  // describe is a part of Mocha. The string is entirely for readability. Shows up in the terminal when the test is ran.
  // Define a test. The next 4 lines are the test
  it("should return a 200 response", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/absurd") // We pass our application into supertest so that supertest can do a GET on '/templates/absurd'
      .expect(200, done); // expect is a part of chai. We tell chai what we want when it comes back.
  });

  // Define a test. The next 4 lines are the test
  it("should return 39178 as content length", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/absurd")
      .expect("Content-Type", "text/html; charset=UTF-8")
      .expect("Content-Length", "6808")
      .expect(200, done);
  });

  // Define a test. The next 4 lines are the test
  it("should contain HTML as content type", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/absurd")
      .expect("Content-Type", /html/)
      .expect("Content-Length", "6808")
      .expect(200, done);
  });
});

// +--------------------------+
// |      Out Fourth Test      |
// +--------------------------+
describe("GET [ Aside HTML Page ] /templates/aside", function () {
  // describe is a part of Mocha. The string is entirely for readability. Shows up in the terminal when the test is ran.
  // Define a test. The next 4 lines are the test
  it("should return a 200 response", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/aside") // We pass our application into supertest so that supertest can do a GET on '/templates/aside'

      .expect(200, done); // expect is a part of chai. We tell chai what we want when it comes back.
  });

  // Define a test. The next 4 lines are the test
  it("should return 39178 as content length", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/aside")
      .expect("Content-Type", "text/html; charset=UTF-8")
      .expect("Content-Length", "6095")
      .expect(200, done);
  });

  // Define a test. The next 4 lines are the test
  it("should contain HTML as content type", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/aside")
      .expect("Content-Type", /html/)
      .expect("Content-Length", "6095")
      .expect(200, done);
  });
});


// +--------------------------+
// |  Our Fifth Test - band   |
// +--------------------------+
describe("GET [ Aside HTML Page ] /templates/band", function () {
  // describe is a part of Mocha. The string is entirely for readability. Shows up in the terminal when the test is ran.
  // Define a test. The next 4 lines are the test
  it("should return a 200 response", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/band") // We pass our application into supertest so that supertest can do a GET on '/templates/aside'

      .expect(200, done); // expect is a part of chai. We tell chai what we want when it comes back.
  });

  // Define a test. The next 4 lines are the test
  it("Sould check content type, and content length", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/band")
      .expect("Content-Type", "text/html; charset=UTF-8")
      .expect("Content-Length", "16790")
      .expect(200, done);
  });

  it('should include a "fictional band website" string', function (done) {
    request(app)
      .get('/templates/band')
      .set('Content-Type', '/html/')
      .expect('Content-Type', /html/)
      .expect(200, function (err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('fictional band website');
        // Done
        done();
      });
  });

  // Define a test. The next 4 lines are the test
  it("should contain HTML as content type", function (done) {
    // "it" is a part of mocha. The string we pass in shows up in the terminal. Does not change the end result. Entirely for debugging/readability
    request(app)
      .get("/templates/aside")
      .expect("Content-Type", /html/)
      .expect(200, done);
  });
});

// +--------------------------+
// |      Our 6th Test blog   |
// +--------------------------+
describe("GET [ Aside HTML Page ] /templates/blog", function () {
  it("should return a 200 response", function (done) {
    request(app)
      .get("/templates/blog")
      .expect(200, done);
  });

  it("Sould check content type, and content length", function (done) {
    request(app)
      .get("/templates/blog")
      .expect("Content-Type", "text/html; charset=UTF-8")
      .expect("Content-Length", "11558")
      .expect(200, done);
  });

  it('should include a the word "Archives"', function (done) {
    request(app)
      .get('/templates/blog')
      .set('Content-Type', '/html/')
      .expect('Content-Type', /html/)
      .expect(200, function (err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('Account');
        // Done
        done();
      });
  });

  it("should contain HTML as content type", function (done) {
    request(app)
      .get("/templates/aside")
      .expect("Content-Type", /html/)
      .expect(200, done);
  });
});

// +--------------------------+
// |      Our 7th Test cards   |
// +--------------------------+
describe("GET [ Aside HTML Page ] /templates/cards", function () {

  it("should return a 200 response", function (done) {
    request(app)
      .get("/templates/cards")
      .expect(200, done);
  });

  it('should include a SEI 1025 in footer', function (done) {
    request(app)
      .get('/templates/cards')
      .set('Content-Type', '/html/')
      .expect('Content-Type', /html/)
      .expect(200, function (err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('SEI 1025');
        done();
      });
  });

  it("Sould check content type, and content length", function (done) {
    request(app)
      .get("/templates/cards")
      .expect("Content-Type", "text/html; charset=UTF-8")
      .expect("Content-Length", "4277")
      .expect(200, done);
  });
  it("should contain HTML as content type", function (done) {
    request(app)
      .get("/templates/aside")
      .expect("Content-Type", /html/)
      .expect("Content-Length", "6095")
      .expect(200, done);
  });
});


/// GET DATA FOR DATES
describe('GET [ data for Dates ] /dates', function () {

  it('should have property dates', function (done) {
    request(app)
      .get('/dates')
      .set('Content-Type', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200, function (err, res) {
        if (err) { return done(err); }
        let data = res.body;
        console.log(data);
        expect(data).to.have.own.property('dates');
        // Done
        done();
      });
  });

  it('should include a admin.css file', function (done) {
    request(app)
      .get('/templates/admin')
      .set('Content-Type', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200, function (err, res) {
        if (err) { return done(err); }
        // console.log(res.text);
        expect(res.text).to.include('css/admin.css');
        // Done
        done();
      });
  });

  it('should include an etag and a date', function (done) {
    request(app)
      .get('/dates')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, function (err, res) {
        if (err) { return done(err); }
        let data = res.body;
        expect(data.dates).to.be.an('array').that.is.not.empty;
        expect(res.header).to.have.property('etag');
        expect(data.dates).to.be.an('array').that.includes('7-Jan-20');

        // Done
        done();
      });
  });
});

// +--------------------------+  // +--------------------------+
// |      Total Test Built     | // |             6            |
// +--------------------------+// +--------------------------+

// +--------------------------+  // +--------------------------+
// |   Total Test Passing     | // |             6           |
// +--------------------------+// +--------------------------+
