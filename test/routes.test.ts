import request from "supertest";

import app from "../src/app";
import topClubsCategory from "../src/models/topClubsCategory";
import topPlayersCategory from "../src/models/topPlayersCategory";

function checkRoute(route: string) {
    describe(`GET /api/v1/${route}`, () => {
        it("should return 200 OK", (done) => {
            request(app).get(`/api/v1/${route}`).expect(200, done);
        });
    });
}

(function checkRoutes() {
    topPlayersCategory.forEach((category) => {
        checkRoute(`topPlayers/${category}`);
    });

    topClubsCategory.forEach((category) => {
        checkRoute(`topClubs/${category}`);
    });
})();
