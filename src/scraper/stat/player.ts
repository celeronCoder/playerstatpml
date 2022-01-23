import { PlayerData } from "../../models";
import { topPlayersCategory } from "../../models/category";

import axios from "axios";
import cheerio from "cheerio";

async function scrapePlayerData(category: string): Promise<PlayerData[]> {
    const data: PlayerData[] = [];
    if (topPlayersCategory.includes(category))
        await axios
            .get(`https://www.premierleague.com/stats/top/players/${category}`)
            .then((response) => {
                const html = response.data;
                const $ = cheerio.load(html, { ignoreWhitespace: true });
                const statsTable: cheerio.Cheerio = $(
                    ".statsTableContainer > tr"
                );

                statsTable.each((i, elm) => {
                    const rank: number = parseInt(
                        $(elm).find(".rank > strong").text()
                    );

                    const name: string = $(elm)
                        .find(".playerName > strong")
                        .text();

                    const club = $(elm)
                        .find(".statNameSecondary")
                        .contents()
                        .last()
                        .text()
                        .trim();

                    const nationality: string = $(elm)
                        .find(".playerCountry")
                        .text();

                    const stat: number = parseInt(
                        $(elm).find(".mainStat").text()
                    );

                    data.push({
                        rank,
                        name,
                        club,
                        nationality,
                        stat,
                    });
                });
            })
            .catch(console.error);

    return data;
}

export default scrapePlayerData;
