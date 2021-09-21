import axios from "axios";
import cheerio from "cheerio";
import ClubData from "./models/ClubData";

import PlayerData from "./models/PlayerData";
import topClubsCategory from "./models/topClubsCategory";
import topPlayersCategory from "./models/topPlayersCategory";

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

async function scrapeClubData(category: string): Promise<ClubData[]> {
    const data: ClubData[] = [];

    if (topClubsCategory.includes(category))
        await axios
            .get(`https://www.premierleague.com/stats/top/clubs/${category}`)
            .then((response) => {
                const html = response.data;
                const $ = cheerio.load(html);
                const statsTable: cheerio.Cheerio = $(
                    ".statsTableContainer > tr"
                );
                statsTable.each((i, elm: cheerio.Element) => {
                    const rank: number = parseInt(
                        $(elm).find("td").first().text()
                    );

                    const name: string = $(elm)
                        .find("td")
                        .first()
                        .next()
                        .text()
                        .trim();

                    const stat: number = parseInt(
                        $(elm).find(".mainStat").text().replace(/,/g, "")
                    );

                    data.push({
                        rank,
                        name,
                        stat,
                    });
                });
            })
            .catch(console.error);

    return data;
}

export { scrapePlayerData, scrapeClubData };
