import axios from "axios";
import cheerio from "cheerio";

import PlayerData from "./models/PlayerData";

const axiosInstance = axios.create();

interface urlObject {
    [key: string]: string;
}

const scrapeURLs: urlObject = {
    goal: "https://www.premierleague.com/stats/top/players/goals",
    assist: "https://www.premierleague.com/stats/top/players/goal_assist",
};

async function topScorers(): Promise<PlayerData[]> {
    const data: PlayerData[] = [];
    await axiosInstance
        .get(scrapeURLs.goal)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html, { ignoreWhitespace: true });
            const statsTable: cheerio.Cheerio = $(".statsTableContainer > tr");

            statsTable.each((i, elm) => {
                const rank: number = parseInt(
                    $(elm).find(".rank > strong").text()
                );

                const name: string = $(elm).find(".playerName > strong").text();

                const club = $(elm)
                    .find(".statNameSecondary")
                    .contents()
                    .last()
                    .text()
                    .trim();

                const nationality: string = $(elm)
                    .find(".playerCountry")
                    .text();

                const goals: number = parseInt($(elm).find(".mainStat").text());

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

async function topAssists(): Promise<PlayerData[]> {
    const data: PlayerData[] = [];
    await axiosInstance
        .get(scrapeURLs.assist)
        .then((response) => {
            const html = response.data;
            // console.log(html)
            const $ = cheerio.load(html);
            const statsTable: cheerio.Cheerio = $(".statsTableContainer > tr");

            statsTable.each((i, elm) => {
                const rank: number = parseInt(
                    $(elm).find(".rank > strong").text()
                );

                const name: string = $(elm).find(".playerName > strong").text();

                const club = $(elm)
                    .find(".statNameSecondary")
                    .contents()
                    .last()
                    .text()
                    .trim();

                const nationality: string = $(elm)
                    .find(".playerCountry")
                    .text();

                const goals: number = parseInt($(elm).find(".mainStat").text());

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

export { topScorers, topAssists };
