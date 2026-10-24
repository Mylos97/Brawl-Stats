import { getAllPlayerStats, getTotalTrackedPlayers } from "./fetchPlayer.js"
import { getAllBattleStats } from "./state.js";
import { createTopBrawlerChart, createTopGamesModesChart, createLineChart } from "./chartsGeneric.js";

const [, totalTrackedPlayers] = await Promise.all([
    getAllPlayerStats(),
    getTotalTrackedPlayers()
]);
const container = document.getElementById("showcase");
const topBrawlersChartId = "topBrawlersChart";
const topGamemodesChartId = "topGamemodesChart";
const battleHistoryChartId = "battleHistoryChart";

let state = null;

try {
    state = getAllBattleStats();
} catch (error) {
    console.error("Could not load all player battle statistics:", error);
}

if (state) {
    createCards(state, totalTrackedPlayers);
    createTopBrawlerChart(state, topBrawlersChartId);
    createTopGamesModesChart(state, topGamemodesChartId);

    createLineChart(
        battleHistoryChartId,
        Array.isArray(state.saved_battles_each_day) ? state.saved_battles_each_day.map((entry) => entry.date) : [],
        Array.isArray(state.saved_battles_each_day) ? state.saved_battles_each_day.map((entry) => entry.battles || 0) : [],
        "Battle history"
    );
} else {
    container.className = "card-showcase";
    container.innerHTML = `
        <div class="card">
            <h2 class="card-title">Battle Statistics</h2>
            <p class="empty-state">Could not load battle statistics. Please refresh the page or try again later.</p>
        </div>`;
}

function createCards(state, totalTrackedPlayers) {
    const top5Brawlers = `
        <div class="card">
            <div class="chart-container">
                <canvas id="${topBrawlersChartId}"></canvas>
            </div>
        </div>`;

    const top5GamesModes = `
        <div class="card">
            <div class="chart-container">
                <canvas id="${topGamemodesChartId}"></canvas>
            </div>
        </div>`;

    const battleHistory = `
        <div class="card">
            <div class="chart-container">
                <canvas id="${battleHistoryChartId}"></canvas>
            </div>
        </div>`;

    const totalBattles = Number(state.total_battles) || 0;
    const topBrawler = escapeHtml(state.top_brawlers?.[0]?.brawler || "N/A");
    const topGamemode = escapeHtml(state.top_gamemodes?.[0]?.gamemode || "N/A");
    const activePlayers = Array.isArray(state.most_active_player) ? state.most_active_player : [];
    const emptyNote = totalBattles === 0
        ? `<p class="empty-state">No battles have been tracked yet. Data will appear after the next sync.</p>`
        : "";

    const allStats = `
        <div class="card">
            <h2 class="card-title">Battle Statistics</h2>
            <div class="hero-stat">
                <div class="hero-icon">⚔️</div>
                <div class="hero-value">${totalBattles}</div>
                <div class="hero-label">Tracked Battles</div>
            </div>
            ${emptyNote}
            <div class="info-list">
                <div class="info-row">
                    <span class="info-label">Most played brawler</span>
                    <span class="info-value">${topBrawler}</span>
                </div>
                ${createActivePlayerRow("1st active player", activePlayers[0])}
                ${createActivePlayerRow("2nd active player", activePlayers[1])}
                ${createActivePlayerRow("3rd active player", activePlayers[2])}
                <div class="info-row">
                    <span class="info-label">Total Tracked Players</span>
                    <span class="info-value">${Number(totalTrackedPlayers) || 0}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Most played gamemode</span>
                    <span class="info-value">${topGamemode}</span>
                </div>
            </div>
        </div>`

    container.className = "card-showcase";
    container.innerHTML = allStats + top5Brawlers + battleHistory + top5GamesModes;
}

function createActivePlayerRow(label, player) {
    const name = escapeHtml(player?.player || "N/A");
    const tag = player?.tag ? String(player.tag).replace(/^#/, "") : "";
    const value = tag
        ? `<a class="player-link" href="player-info.html?tag=${encodeURIComponent(tag)}">${name}</a>`
        : name;

    return `
        <div class="info-row">
            <span class="info-label">${label}</span>
            <span class="info-value">${value}</span>
        </div>`;
}

function escapeHtml(value) {
    const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(value ?? "").replace(/[&<>"']/g, (character) => entities[character]);
}
