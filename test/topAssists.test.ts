import request from "supertest";
import app from "../src/app";

describe("GET /api/v1/topAssist", () => {
    it("shoud return 200 OK", (done) => {
        request(app).get("/api/v1/topAssist").expect(200, done);
    });
});
