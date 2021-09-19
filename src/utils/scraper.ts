import dotenv from "dotenv";
import axios from "axios";
import cheerio from "cheerio";

import PlayerData from "../models/PlayerData";

dotenv.config();

const axiosInstance = axios.create();

const URL: string =
    "https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1";

const topScorers: PlayerData[] = [];

(async function scrape() {
    await axiosInstance
        .get(URL)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const statsTable: cheerio.Cheerio = $(".statsTableContainer > tr");

            statsTable.each((i, elm) => {
                const rank: number = parseInt(
                    $(elm).find(".rank > strong").text()
                );
                const name: string = $(elm).find(".playerName > strong").text();
                const nationality: string = $(elm)
                    .find(".playerCountry")
                    .text();
                const goals: number = parseInt($(elm).find(".mainStat").text());

                topScorers.push({
                    rank,
                    name,
                    nationality,
                    goals,
                });
            });
        })
        .catch(console.error);
})();

export { topScorers };
