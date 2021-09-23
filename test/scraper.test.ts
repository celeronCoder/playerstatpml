import {
    topClubsCategory,
    topPlayersCategory,
    ClubData,
    PlayerData,
} from "../src/models";
import { scrapeClubData, scrapePlayerData } from "../src/scraper/stat";

function checkDataOfPlayer(data: string) {
    jest.setTimeout(10000);
    describe(`data check of ${data}`, () => {
        it("should return 20 entries of players", async () => {
            const playerData: PlayerData[] = await scrapePlayerData(data);
            expect(playerData.length > 0).toBe<boolean>(true);
        });
    });
}

function checkDataOfClub(data: string) {
    jest.setTimeout(10000);
    describe(`data check of ${data}`, () => {
        it("should return 20 entries of players", async () => {
            const clubData: ClubData[] = await scrapeClubData(data);
            expect(clubData.length > 0).toBe<boolean>(true);
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
