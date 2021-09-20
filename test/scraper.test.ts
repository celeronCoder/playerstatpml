import PlayerData from "../src/models/PlayerData";
import { topAssists, topScorers } from "../src/scraper";

describe("data check of topScorers", () => {
    jest.setTimeout(10000);
    it("should return 20 entries of players", async () => {
        const data: PlayerData[] = await topScorers();
        expect(data.length).toBe<number>(20);
    });
});

describe("data check of topAssist", () => {
    jest.setTimeout(10000);
    it("should return 20 entries of players", async () => {
        const data: PlayerData[] = await topAssists();
        expect(data.length).toBe<number>(20);
    });
});
