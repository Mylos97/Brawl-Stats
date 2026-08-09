import { createHorizontalBarChart, createLineChart } from "./chartsGeneric.js";

const container = document.getElementById("graphShowcase");
const trophyHistoryId = "trophyHistoryChart";
let brawlerChart = null;
let gamemodeChart = null;
let trophyHistoryChart = null;

function createTopBrawlerChart(battleStats) {
    brawlerChart = createHorizontalBarChart(
        "topBrawlersChart",
        battleStats.top_brawlers.map(b => b.brawler),
        battleStats.top_brawlers.map(b => b.games),
        "Favorite Brawlers",
        "Games Played"
    );
}

function createTopGamesModesChart(battleStats) {
    gamemodeChart = createHorizontalBarChart(
        "topGamemodesChart",
        battleStats.top_gamemodes.map(g => g.gamemode),
        battleStats.top_gamemodes.map(g => g.games),
        "Favorite Gamemodes",
        "Games Played"
    );
}

function cleanUpcharts() {
    if (brawlerChart) brawlerChart.destroy();
    if (gamemodeChart) gamemodeChart.destroy();
}

function createCards() {
    const top5Brawlers = `
        <div class="card">
            <div class="chart-container">
                <canvas id="topBrawlersChart"></canvas>
            </div>
        </div>`

    const top5GamesModes = `
        <div class="card">
            <div class="chart-container">
                <canvas id="topGamemodesChart"></canvas>
            </div>
        </div>`;


    const trophyHistoryChart = `
    <div class="card">
        <div class="chart-container">
            <canvas id=${trophyHistoryId}></canvas>
        </div> 
    </div>`
    ;

    container.innerHTML = top5Brawlers + trophyHistoryChart + top5GamesModes;
}

export function createCharts(battleStats) {
    cleanUpcharts();

    createCards();
    createTopBrawlerChart(battleStats);
    createTopGamesModesChart(battleStats);
    createLineChart(
        trophyHistoryId,
        battleStats.daily_trophies.map(entry => entry.date),
        battleStats.daily_trophies.map(entry => entry.trophies_gained),
        "Trophy History"
    );
}