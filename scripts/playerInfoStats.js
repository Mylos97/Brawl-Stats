import { brawlersWithBuffies } from "./buffies.js";

export function displayPlayerData(playerData, battleStats) {
    const cardshowCase = document.getElementById("cardShowcase");
    const playerHeaderName = document.getElementById("currentPlayerTag");

    if (!playerData) {
        cardshowCase.innerHTML = "";
        console.error("No player data available to display.");
        return;
    }

    const selectedPlayerTag = (playerData.tag || "").trim();
    playerHeaderName.textContent = `${playerData.name} ${playerData.tag}`

    const allBrawlersLength = 105;
    const brawlers = playerData.brawlers || [];
    const topBrawlers = brawlers.sort((a, b) => b.trophies - a.trophies);
    const averageTrophies = brawlers.length > 0 ? Math.round(brawlers.reduce((sum, b) => sum + b.trophies, 0) / brawlers.length) : 0;
    const totalPrestige = playerData.totalPrestigeLevel || 0;
    const totalStarPowers = allBrawlersLength * 2;
    const totalGadgets = allBrawlersLength * 2;
    const totalHyperCharges = allBrawlersLength;
    const totalGears = allBrawlersLength * 8;
    const collectedStarPowers = brawlers.reduce((sum, b) => sum + b.starPowers.length, 0);
    const collectedGadgets = brawlers.reduce((sum, b) => sum + b.gadgets.length, 0);
    const collecedHyperCharges = brawlers.reduce((sum, b) => sum + b.hyperCharges.length, 0);
    const collectedGears = brawlers.reduce((sum, b) => sum + b.gears.length, 0);
    const buffedBrawlerCount = brawlers.reduce((count, b) => {
        const brawlerName = (b.name || "").toUpperCase();
        if (brawlersWithBuffies.has(brawlerName)) {
            const buffies = b.buffies;
            const starBuffy = buffies.starPower;
            const gadgetBuffy = buffies.gadget;
            const hyperBuffy = buffies.hyperCharge;
            return count + starBuffy + gadgetBuffy + hyperBuffy;
        }
        return count;
    }, 0);
    const totaltBuffies = brawlersWithBuffies.size * 3;

    const playerInfoHtml = `
      <div class="card">
        <h2 class="card-title">General Player Info</h2>
        <div class="info-grid">
          <div><strong>Trophies</strong><span>${playerData.trophies}</span></div>
          <div><strong>Club</strong><span>${playerData.club?.name || "No club"}</span></div>
          <div><strong>Average Trophies per Brawler</strong><span>${averageTrophies}</span></div>
          <div><strong>Total Prestige</strong><span>${totalPrestige}</span></div>
          <div><strong>3vs3Victories</strong><span>${playerData["3vs3Victories"] || 0}</span></div>
          <div><strong>Showdown Victories</strong><span>${playerData["soloVictories"] || 0}</span></div>
        </div>
      </div>
    `;

    const collectlibesHtml = `
      <div class="card">
        <h2 class="card-title">Collectibles</h2>
        <div class="info-grid">
          <div>
            <strong>Brawlers</strong>
            <span>${brawlers.length}/${allBrawlersLength}</span>
            <progress class="progress-bar-color-brawlers" value=${brawlers.length} max=${allBrawlersLength}></progress>
          </div>
          <div>
            <strong>Buffies</strong>
            <span>${buffedBrawlerCount}/${totaltBuffies}</span>
            <progress class="progress-bar-color-buffies" value=${buffedBrawlerCount} max=${totaltBuffies}></progress>
          </div>
          <div>
            <strong>Star Powers</strong>
            <span>${collectedStarPowers}/${totalStarPowers}</span>
            <progress class="progress-bar-color-starpower" value=${collectedStarPowers} max=${totalStarPowers}></progress>
          </div>
          <div>
            <strong>Gadgets</strong>
            <span>${collectedGadgets}/${totalGadgets}</span>
            <progress class="progress-bar-color-gadget" value=${collectedGadgets} max=${totalGadgets}></progress>
            </div>
          <div>
            <strong>Hyper Charges</strong>
            <span>${collecedHyperCharges}/${totalHyperCharges}</span>
            <progress class="progress-bar-color-hypercharge" value=${collecedHyperCharges} max=${totalHyperCharges}></progress>
          </div>
          <div>
            <strong>Gears</strong>
            <span>${collectedGears}/${totalGears}</span>
            <progress class="progress-bar-color-gear" value=${collectedGears} max=${totalGears}></progress>
          </div>
        </div>
      </div>
    `;

    const gameStatsHtml = `
      <div class="card">
        <h2 class="card-title">Ranked Stats</h2>
        <div class="info-grid">
          <div><strong>Current Ranked Elo</strong><span>${playerData.rankedElo || 0}</span></div>
          <div><strong>Current Ranked Name</strong><span>${playerData["highestSeasonRankedRankName"] || 0}</span></div>
          <div><strong>Top Ranked Elo</strong><span>${playerData["highestAllTimeRankedElo"] || 0}</span></div>
          <div><strong>Top Ranked Name</strong><span>${playerData["highestAllTimeRankedRankName"] || 0}</span></div>
        </div>
      </div>
    `;

    const battleStatsHtml = `
    <div class="card">
        <h2 class="card-title">Tracked Battle Statistics</h2>

    <div class="info-grid">
      <div>
        <strong>Total Battles</strong>
        <span>${battleStats.total_battles || 0}</span>
      </div>

      <div>
        <strong>Wins</strong>
        <span>${battleStats.wins || 0}</span>
      </div>

      <div>
        <strong>Losses</strong>
        <span>${battleStats.losses || 0}</span>
      </div>

      <div>
        <strong>Win Rate</strong>
        <span>${battleStats.win_rate || 0}%</span>
      </div>

      <div>
        <strong>Trophy Change</strong>
        <span>${battleStats.trophy_change || 0}</span>
      </div>
    </div>
  </div>`;

    cardshowCase.innerHTML = playerInfoHtml + collectlibesHtml + gameStatsHtml + battleStatsHtml;
}