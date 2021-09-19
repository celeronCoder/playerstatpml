import request from "supertest";
import app from "../src/app";

describe("GET /api/v1/topScorers", () => {
	it("shoud return 200 OK", done => {
		request(app).get("/api/v1/topScorers")
			.expect(200, done);
	})
})