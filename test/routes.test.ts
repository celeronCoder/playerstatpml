import request from "supertest";

import app from "../src/app";
import categoryTypes from "../src/models/category";
import { topClubsCategory, topPlayersCategory } from "../src/models/category";

function checkRoute(route: string): void {
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

	categoryTypes.forEach(type => {
		checkRoute(`category/${type}`);
	});

	checkRoute(`category/types`);
})();
