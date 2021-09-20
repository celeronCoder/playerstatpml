import PlayerData from "../src/models/PlayerData";
import scrapePlayerData from "../src/scraper";

describe("data check of topScorers", () => {
    jest.setTimeout(10000);
    it("should return 20 entries of players", async () => {
        const data: PlayerData[] = await scrapePlayerData("goals");
        expect(data.length).toBe<number>(20);
    });
});

describe("data check of topAssist", () => {
    jest.setTimeout(10000);
    it("should return 20 entries of players", async () => {
        const data: PlayerData[] = await scrapePlayerData("goal_assist");
        expect(data.length).toBe<number>(20);
    });
});
