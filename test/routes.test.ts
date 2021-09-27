import request from "supertest";

import app from "../src/app";
import { topClubsCategory, topPlayersCategory } from "../src/models/";

function checkRoute(route: string) {
    describe(`GET /api/v1/${route}`, () => {
        it("should return 200 OK", (done) => {
            request(app).get(`/api/v1/${route}`).expect(200, done);
        });
    });
}

(function checkRoutes() {
    topPlayersCategory.forEach((category) => {
        checkRoute(`stats/top/players/${category}`);
    });

    topClubsCategory.forEach((category) => {
        checkRoute(`stats/top/clubs/${category}`);
    });
})();
