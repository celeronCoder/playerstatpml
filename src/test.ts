import ClubData from "./models/ClubData";
import PlayerData from "./models/PlayerData";
import { scrapeClubData, scrapePlayerData } from "./scraper";

async function test() {
    const data: ClubData[] = await scrapeClubData();
}

async function test2() {
    const data: PlayerData[] = await scrapePlayerData("goals");
}

test();
// test2();
