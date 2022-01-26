const app = require("../app");
const request = require("supertest");
const mongoose = require('mongoose');
var Gun = mongoose.model('Gun');

var mongoTestConnectionUrl = process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/wz-mate-test";

var mockData = [
    {"name": "m4a1", "type": "ar"},
    {"name": "ak47", "type": "ar"},
    {"name": "mp5", "type": "smg"}
]

beforeAll((done) => {
	mongoose.connect(
		mongoTestConnectionUrl,
		{ useNewUrlParser: true },
		() => done()
	);
    Gun.insertMany(mockData, (err, docs) => {
        if(err) console.log("Error populating mock data: " + err);
        else console.log("Mock data populated successfully!");
    });
})

afterAll((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

///
///TESTING FOR GET REQUESTS
///

//get all guns
describe("GET /api/guns/all", () => {
    describe("when request for all guns", () => {
        test("response should have a 200 status code", async () => {
            const response = await request(app).get("/api/guns/all").send({});
            expect(response.statusCode).toBe(200);
        })
    })
    describe("when request for all guns", () => {
        test("response should have a content-type of json", async () => {
            const response = await request(app).get("/api/guns/all").send({});
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        })
    })
})

//get gun by name
describe("GET /api/guns/:name", () => {
    describe("when request for gun by name", () => {
        test("response should have a 200 status code", async () => {
            const response = await request(app).get("/api/guns/m4a1").send({});
            expect(response.statusCode).toBe(200);
        })
    })
    describe("when request for gun by name", () => {
        test("response should have a content-type of json", async () => {
            const response = await request(app).get("/api/guns/m4a1").send({});
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        })
    })
})