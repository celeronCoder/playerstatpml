import axios from "axios";
import cheerio from "cheerio";
import ClubData from "./models/ClubData";

import PlayerData from "./models/PlayerData";
import topPlayersCategory from "./routes/topPlayersCategory";

async function scrapePlayerData(scrapeUrl: string): Promise<PlayerData[]> {
    const data: PlayerData[] = [];
    if (topPlayersCategory.includes(scrapeUrl))
        await axios
            .get(`https://www.premierleague.com/stats/top/players/${scrapeUrl}`)
            .then((response) => {
                const html = response.data;
                const $ = cheerio.load(html, { ignoreWhitespace: true });
                const statsTable: cheerio.Cheerio = $(".statsTableContainer");
                console.log(statsTable);

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

                    const goals: number = parseInt(
                        $(elm).find(".mainStat").text()
                    );

                    data.push({
                        rank,
                        name,
                        club,
                        nationality,
                        goals,
                    });
                });
            })
            .catch(console.error);

    return data;
}

async function scrapeClubData(): Promise<ClubData[]> {
    const data: ClubData[] = [];

    await axios
        .get("https://www.premierleague.com/clubs")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const clubsTable: cheerio.Cheerio = $(".allTimeDataContainer");

            console.log(clubsTable.children());

            clubsTable.each((i, elm: cheerio.Element) => {
                const name = $(elm)
                    .find(".team > a > .nameContainer > .clubName")
                    .text();

                console.log("name");

                const stadium = $(elm)
                    .find(".team > a > .nameContainer > .stadiumName")
                    .text();

                data.push({
                    name,
                    stadium,
                });
            });
        })
        .catch(console.error);

    return data;
}

export { scrapePlayerData, scrapeClubData };
