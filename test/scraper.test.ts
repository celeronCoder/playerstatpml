import PlayerData from "../src/models/PlayerData";
import { topScorers } from "../src/utils/scraper";

describe("type check of playerData", () => {
	jest.setTimeout(10000);
	it("should return topScorers object of type PlayerData", () => {
		const testScorer: PlayerData[] = [];
		expect(typeof topScorers).toEqual(typeof testScorer);
	});
})