var sinon     = require("sinon");
    user      = require("../routes/user.js"),
    db        = require("../lib/db.js"),
    chai      = require("chai"),
    supertest = require("supertest-chai"),
    should    = require("chai").should(),
    express   = require("express");

describe("User", function() {
    var app = express(),
        req = supertest.request;

    beforeEach(function () {
        chai.use(supertest.httpAsserts);
    });

    describe("#findAll()", function() {
        it("should return all users",function() {
            // This is our database output
            var dbOutput = [
                {
                    id: "123",
                    email: "test@test.com"
                },
                {
                    id: "456",
                    email: "test2@test.com"
                }
            ],
                expected = { users: dbOutput };

            // Stub out database interface
            sinon.stub(db, "query").yields(null, dbOutput);

            // Mimic express using supertest - https://github.com/visionmedia/supertest
            app.get("/v1/users", user.findAll);

            // Fire the "mock" request
            req(app)
                .get("/v1/users")
                .end(function (res) {
                    res.should.be.json;
                    res.body.should.deep.equal(expected);
                });
        });
    });
});
