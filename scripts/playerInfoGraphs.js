import { createHorizontalBarChart, createLineChart } from "./chartsGeneric.js";

const container = document.getElementById("graphShowcase");
const trophyHistoryId = "trophyHistoryChart";
let brawlerChart = null;
let gamemodeChart = null;
let trophyHistoryChart = null;

function createTopBrawlerChart(battleStats) {
    const labels = Array.isArray(battleStats.top_brawlers) ? battleStats.top_brawlers.map((b) => b.brawler) : [];
    const data = Array.isArray(battleStats.top_brawlers) ? battleStats.top_brawlers.map((b) => b.games || 0) : [];

    brawlerChart = createHorizontalBarChart(
        "topBrawlersChart",
        labels,
        data,
        "Favorite Brawlers",
        "Games Played"
    );
}

function createTopGamesModesChart(battleStats) {
    const labels = Array.isArray(battleStats.top_gamemodes) ? battleStats.top_gamemodes.map((g) => g.gamemode) : [];
    const data = Array.isArray(battleStats.top_gamemodes) ? battleStats.top_gamemodes.map((g) => g.games || 0) : [];

    gamemodeChart = createHorizontalBarChart(
        "topGamemodesChart",
        labels,
        data,
        "Favorite Gamemodes",
        "Games Played"
    );
}

function cleanUpCharts() {
    if (brawlerChart) {
        brawlerChart.destroy();
        brawlerChart = null;
    }

    if (gamemodeChart) {
        gamemodeChart.destroy();
        gamemodeChart = null;
    }

    if (trophyHistoryChart) {
        trophyHistoryChart.destroy();
        trophyHistoryChart = null;
    }
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
    cleanUpCharts();

    createCards();
    createTopBrawlerChart(battleStats);
    createTopGamesModesChart(battleStats);
    trophyHistoryChart = createLineChart(
        trophyHistoryId,
        Array.isArray(battleStats.daily_trophies) ? battleStats.daily_trophies.map((entry) => entry.date) : [],
        Array.isArray(battleStats.daily_trophies) ? battleStats.daily_trophies.map((entry) => entry.trophies_gained || 0) : [],
        "Trophy History"
    );
}