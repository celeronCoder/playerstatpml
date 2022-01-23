import {
    ClubData,
    PlayerData,
} from "../src/models";
import {
	topClubsCategory,
    topPlayersCategory,
} from "../src/models/category";
import { scrapeClubData, scrapePlayerData } from "../src/scraper/stat";

namespace DataCheck {
    export function checkDataOfPlayer(data: string) {
        jest.setTimeout(10000);
        describe(`data check of player -> '${data}'.`, () => {
            it(`should return an array with entries of players -> ${data}`, async () => {
                const playerData: PlayerData[] = await scrapePlayerData(data);
                expect(playerData.length > 0).toBe<boolean>(true);
            });
        });
    }

    export const ignoreClubsCategories: Array<String> = [
        "total_sub_on",
        "offside_provoked",
        "fouls",
    ];

    export function checkDataOfClub(data: string) {
        jest.setTimeout(10000);
        describe(`data check of club -> '${data}'.`, () => {
            it(`should return an array with entries of clubs -> ${data}`, async () => {
                const clubData: ClubData[] = await scrapeClubData(data);
                expect(clubData.length > 0).toBe<boolean>(true);
            });
        });
    }
}

(function checkData() {
    topPlayersCategory.forEach((category) => {
        DataCheck.checkDataOfPlayer(category);
    });

    topClubsCategory.forEach((category) => {
        if (!DataCheck.ignoreClubsCategories.includes(category))
            DataCheck.checkDataOfClub(category);
    });
})();
