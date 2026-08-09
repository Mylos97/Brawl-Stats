import { brawlersWithBuffies } from "./buffies.js";
import { createDoughnutChart } from "./chartsGeneric.js";

export function displayPlayerData(playerData, battleStats) {
    const cardShowcase = document.getElementById("cardShowcase");
    const playerHeaderName = document.getElementById("currentPlayerTag");

    if (!playerData) {
        cardShowcase.innerHTML = "";
        console.error("No player data available to display.");
        return;
    }

    const selectedPlayerTag = (playerData.tag || "").trim();
    playerHeaderName.textContent = `${playerData.name || "Unknown"} (${selectedPlayerTag})`;

    const allBrawlersLength = 105;
    const brawlers = Array.isArray(playerData.brawlers) ? [...playerData.brawlers] : [];
    const averageTrophies = brawlers.length > 0 ? Math.round(brawlers.reduce((sum, b) => sum + (Number(b.trophies) || 0), 0) / brawlers.length) : 0;
    const totalPrestige = playerData.totalPrestigeLevel || 0;
    const totalStarPowers = allBrawlersLength * 2;
    const totalGadgets = allBrawlersLength * 2;
    const totalHyperCharges = allBrawlersLength;
    const totalGears = allBrawlersLength * 8;
    const totalBuffies = brawlersWithBuffies.size * 3;
    const collectedStarPowers = brawlers.reduce((sum, b) => sum + (Array.isArray(b.starPowers) ? b.starPowers.length : 0), 0);
    const collectedGadgets = brawlers.reduce((sum, b) => sum + (Array.isArray(b.gadgets) ? b.gadgets.length : 0), 0);
    const collectedHyperCharges = brawlers.reduce((sum, b) => sum + (Array.isArray(b.hyperCharges) ? b.hyperCharges.length : 0), 0);
    const collectedGears = brawlers.reduce((sum, b) => sum + (Array.isArray(b.gears) ? b.gears.length : 0), 0);
    const collectedBrawlers = brawlers.length;
    const collectedBuffies = brawlers.reduce((count, b) => {
        const brawlerName = (b.name || "").toUpperCase();
        if (!brawlersWithBuffies.has(brawlerName)) {
            return count;
        }

        const buffies = b.buffies || {};
        return count + (Number(buffies.starPower) || 0) + (Number(buffies.gadget) || 0) + (Number(buffies.hyperCharge) || 0);
    }, 0);
    const brawlersGroupedByPower = brawlers.reduce((acc, b) => {
        const power = Number(b.power);
        let powerGroup = "Other";

        if (power < 7) {
            powerGroup = "< 7";
        } else if (power === 7 || power === 8) {
            powerGroup = "< 9";
        } else if (power === 9) {
            powerGroup = "9";
        } else if (power === 11) {
            powerGroup = "11";
        }

        acc[powerGroup] = (acc[powerGroup] || 0) + 1;
        return acc;
    }, {});

    const sortedBrawlersGroupedByPower = ["11", "9", "< 9", "< 7", "Other"].map((label) => ({
        label,
        value: brawlersGroupedByPower[label] || 0
    })).filter((item) => item.value > 0);

    const powerLevelChartId = "powerLevelChart";
    const brawlersGroupedByTrophies = brawlers.reduce((acc, b) => {
        const trophies = Number(b.trophies);
        let rangeLabel;

        if (trophies < 250) {
            rangeLabel = "~250";
        } else if (trophies < 500) {
            rangeLabel = "~500";
        } else if (trophies < 2000) {
            rangeLabel = "~1000";
        } else if (trophies < 3000) {
            rangeLabel = "~2000";
        } else {
            rangeLabel = "~3000";
        }

        acc[rangeLabel] = (acc[rangeLabel] || 0) + 1;
        return acc;
    }, {});
    const trophyRangeChartId = "trophyRangeChart";

    const collectedItems = collectedBrawlers + collectedBuffies + collectedStarPowers + collectedGadgets + collectedHyperCharges + collectedGears;
    const totalItems = allBrawlersLength + totalBuffies + totalStarPowers + totalGadgets + totalHyperCharges + totalGears;

    const playerInfoHtml = `
<div class="card">
    <h2 class="card-title">General Player Info</h2>

    <div class="hero-stat">
        <div class="hero-icon">🏆</div>
        <div class="hero-value">${(Number(playerData.trophies) || 0).toLocaleString()}</div>
        <div class="hero-label">Current Trophies</div>
    </div>

    <div class="info-list">

        <div class="info-row">
            <span class="info-label">Club</span>
            <span class="info-value">${playerData.club?.name || "No Club"}</span>
        </div>

        <div class="info-row">
            <span class="info-label">Average Trophies / Brawler</span>
            <span class="info-value">${averageTrophies}</span>
        </div>

        <div class="info-row">
            <span class="info-label">Total Prestige</span>
            <span class="info-value">${totalPrestige}</span>
        </div>

        <div class="info-row">
            <span class="info-label">3v3 Victories</span>
            <span class="info-value">${playerData["3vs3Victories"] || 0}</span>
        </div>

        <div class="info-row">
            <span class="info-label">Solo Victories</span>
            <span class="info-value">${playerData["soloVictories"] || 0}</span>
        </div>

        <div class="info-row">
            <span class="info-label">Total Victories</span>
            <span class="info-value">${playerData["soloVictories"] + playerData["3vs3Victories"] || 0}</span>
        </div>

    </div>
</div>
`;

    const collectlibesHtml = `
        <div class="card">
            <h2 class="card-title">Collectibles</h2>
            <div class="collectible-value"> 
                Total: ${collectedItems} / ${totalItems} items
            </div>
            <div class="info-list">
                <div class="info-row-collectible">
                    <span class="info-label">Brawlers</span>
                    <div class="info-row"> 
                        <progress class="progress-bar-color-brawlers" value=${collectedBrawlers} max=${allBrawlersLength}></progress>
                        <span>${collectedBrawlers}/${allBrawlersLength}</span>
                    </div>
                </div>
                <div class="info-row-collectible">
                    <span class="info-label">Buffies</span>
                    <div class="info-row"> 
                        <progress class="progress-bar-color-buffies" value=${collectedBuffies} max=${totalBuffies}></progress>
                        <span>${collectedBuffies}/${totalBuffies}</span>
                    </div>
                </div>
                <div class="info-row-collectible">
                    <span class="info-label">Starpowers</span>
                    <div class="info-row">
                        <progress class="progress-bar-color-starpower" value=${collectedStarPowers} max=${totalStarPowers}></progress>
                        <span>${collectedStarPowers}/${totalStarPowers}</span>
                    </div>
                </div>
                <div class="info-row-collectible">
                    <span class="info-label">Gadgets</span>
                    <div class="info-row"> 
                        <progress class="progress-bar-color-gadget" value=${collectedGadgets} max=${totalGadgets}></progress>
                        <span>${collectedGadgets}/${totalGadgets}</span>
                    </div>
                </div>
                <div class="info-row-collectible">
                    <span class="info-label">Hypercharges</span>
                    <div class="info-row">
                        <progress class="progress-bar-color-hypercharge" value=${collectedHyperCharges} max=${totalHyperCharges}></progress>
                        <span>${collectedHyperCharges}/${totalHyperCharges}</span>
                    </div>
                </div>
                <div class="info-row-collectible">
                    <span class="info-label">Gears</span>
                    <div class="info-row">
                        <progress class="progress-bar-color-gear" value=${collectedGears} max=${totalGears}></progress>
                        <span>${collectedGears}/${totalGears}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const gameStatsHtml = `
    <div class="card">
        <h2 class="card-title">Brawler Stats</h2>
        <div></div>
        <div class="chart-row">
            <div class="chart-card-panel">
                <div class="chart-container">
                    <canvas id=${powerLevelChartId}></canvas>
                </div>
            </div>
            <div class="chart-card-panel">
                <div class="chart-container">
                    <canvas id=${trophyRangeChartId}></canvas>
                </div>
            </div>
        </div>
    </div>
    `;

    const battleStatsHtml = `
    <div class="card">
        <h2 class="card-title">Battle Statistics</h2>

        <div class="hero-stat">
            <div class="hero-icon">⚔️</div>
            <div class="hero-value">${battleStats.total_battles || 0}</div>
            <div class="hero-label">Tracked Battles</div>
        </div>

        <div class="info-list">
            <div class="info-row">
                <span class="info-label">Wins</span>
                <span class="info-value">${battleStats.wins || 0}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Losses</span>
                <span class="info-value">${battleStats.losses || 0}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Win Rate</span>
                <span class="info-value">${battleStats.win_rate || 0}%</span>
            </div>

            <div class="info-row">
                <span class="info-label">Trophy Change</span>
                <span class="info-value">${battleStats.trophy_change || 0}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Top Gamemode</span>
                <span class="info-value">${Array.isArray(battleStats.top_gamemodes) && battleStats.top_gamemodes.length > 0 ? battleStats.top_gamemodes[0].gamemode : "N/A"}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Top Brawler</span>
                <span class="info-value">${Array.isArray(battleStats.top_brawlers) && battleStats.top_brawlers.length > 0 ? battleStats.top_brawlers[0].brawler : "N/A"}</span>
            </div>
        </div>
    </div>`;

    cardShowcase.innerHTML = playerInfoHtml + collectlibesHtml + gameStatsHtml + battleStatsHtml;

    const powerLevelChart = createDoughnutChart(
        powerLevelChartId,
        sortedBrawlersGroupedByPower.map(x => x.label),
        sortedBrawlersGroupedByPower.map(x => x.value),
        "Brawlers by Power Level"
    );
    const trophyRangeChart = createDoughnutChart(
        trophyRangeChartId,
        Object.keys(brawlersGroupedByTrophies),
        Object.values(brawlersGroupedByTrophies),
        "Brawlers by Trophy Range"
    );
}