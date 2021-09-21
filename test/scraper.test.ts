import ClubData from "../src/models/ClubData";
import PlayerData from "../src/models/PlayerData";
import topClubsCategory from "../src/models/topClubsCategory";
import topPlayersCategory from "../src/models/topPlayersCategory";
import { scrapeClubData, scrapePlayerData } from "../src/scraper";

function checkDataOfPlayer(data: string) {
    jest.setTimeout(10000);
    describe(`data check of ${data}`, () => {
        it("shoul return 20 entries of players", async () => {
            const playerData: PlayerData[] = await scrapePlayerData(data);
            expect(playerData.length).toBe<number>(20);
        });
    });
}

function checkDataOfClub(data: string) {
    jest.setTimeout(10000);
    describe(`data check of ${data}`, () => {
        it("shoul return 20 entries of players", async () => {
            const playerData: ClubData[] = await scrapeClubData(data);
            expect(playerData.length).toBe<number>(20);
        });
    });
}

(function checkData() {
    topPlayersCategory.forEach((category) => {
        checkDataOfPlayer(category);
    });

    topClubsCategory.forEach((category) => {
        checkDataOfClub(category);
    });
})();
