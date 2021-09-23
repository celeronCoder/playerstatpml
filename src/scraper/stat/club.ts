import { ClubData, topClubsCategory } from "../../models";

import axios from "axios";
import cheerio from "cheerio";

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

export default scrapeClubData;
