import request from "supertest";

import app from "../src/app";
import ROUTES from "../src/routes/routes";

function checkRoute(route: string) {
    describe(`GET /api/v1/${route}`, () => {
        it("shoud return 200 OK", (done) => {
            request(app).get(`/api/v1/${route}`).expect(200, done);
        });
    });
}

(function checkRoutes() {
    ROUTES.forEach((route) => {
        checkRoute(route);
    });
})();
