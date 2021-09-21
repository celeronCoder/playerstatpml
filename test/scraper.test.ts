import PlayerData from "../src/models/PlayerData";
import topPlayersCategory from "../src/routes/topPlayersCategory";
import scrapePlayerData from "../src/scraper";

function checkDataOfPlayer(data: string) {
    jest.setTimeout(10000);
    describe(`data check of ${data}`, () => {
        it("shoul return 20 entries of players", async () => {
            const playerData: PlayerData[] = await scrapePlayerData(data);
            expect(playerData.length).toBe<number>(20);
        });
    });
}

(function checkDataOfPlayers() {
    topPlayersCategory.forEach((category) => {
        checkDataOfPlayer(category);
    });
})();
