import { getAllPlayerStats } from "./fetchPlayer.js"
import { getAllBattleStats } from "./state.js";
import { createTopBrawlerChart, createTopGamesModesChart } from "./chartsGeneric.js";

await getAllPlayerStats();
const state = getAllBattleStats();
const container = document.getElementById("showcase");
const topBrawlersChartId = "topBrawlersChart";
const topGamemodesChartId = "topGamemodesChart";
console.log(state)

createCards();
createTopBrawlerChart(state, topBrawlersChartId);
createTopGamesModesChart(state, topGamemodesChartId);

function createCards() {
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
    
    const allStats = `
        <div class="card">
            <h2 class="card-title">Battle Statistics</h2>
            <div class="hero-stat">
                <div class="hero-icon">⚔️</div>
                <div class="hero-value">${state.total_battles || 0}</div>
                <div class="hero-label">Tracked Battles</div>
            </div>
            <div class="info-list">
                <div class="info-row">
                    <span class="info-label">Most played brawler</span>
                    <span class="info-value">${state.top_brawlers[0].brawler || "Unknown"}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Most active player</span>
                    <span class="info-value">${state.most_active_player[0].player || "Unknown"}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Most played gamemode</span>
                    <span class="info-value">${state.top_gamemodes[0].gamemode || "Unknown"}</span>
                </div>
            </div>
        </div>`

    container.className = "card-showcase";
    container.innerHTML = allStats + top5Brawlers + top5GamesModes;
}