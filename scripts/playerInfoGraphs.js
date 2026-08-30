import { createHorizontalBarChart, createLineChart, createDoubleLineChart } from "./chartsGeneric.js";

const container = document.getElementById("graphShowcase");
const trophyHistoryId = "trophyHistoryChart";
const winLossHistoryId = "winLossHistoryChart";
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

function createWinLossChart(battleStats) {
    const labels = Array.isArray(battleStats.win_losses_history) ?
        battleStats.win_losses_history.map((entry) => entry.date) : [];

    const wins = Array.isArray(battleStats.win_losses_history) ?
        battleStats.win_losses_history.map((entry) => entry.win) : []

    const losses = Array.isArray(battleStats.win_losses_history) ?
        battleStats.win_losses_history.map((entry) => entry.loss) : []


    const datasets = [
        {
            label: 'Wins',
            data: wins,
            borderColor: "green",
            yAxisID: 'y',
            tension: 0.4
        },
        {
            label: 'Losses',
            data: losses,
            borderColor: "red",
            yAxisID: 'y',
            tension: 0.4
        }
    ];


    createDoubleLineChart(winLossHistoryId, labels, datasets, "Win/Loss History");
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

    const winLossesChart = `
    <div class="card">
        <div class="chart-container">
            <canvas id=${winLossHistoryId}></canvas>
        </div> 
    </div>`
        ;

    container.innerHTML = top5Brawlers + trophyHistoryChart + top5GamesModes + winLossesChart;
}

export function createCharts(battleStats) {
    cleanUpCharts();

    createCards();
    createTopBrawlerChart(battleStats);
    createTopGamesModesChart(battleStats);
    createWinLossChart(battleStats);
    trophyHistoryChart = createLineChart(
        trophyHistoryId,
        Array.isArray(battleStats.daily_trophies) ? battleStats.daily_trophies.map((entry) => entry.date) : [],
        Array.isArray(battleStats.daily_trophies) ? battleStats.daily_trophies.map((entry) => entry.trophies_gained || 0) : [],
        "Trophy History"
    );
}