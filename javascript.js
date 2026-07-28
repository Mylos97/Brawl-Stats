import { brawlersWithBuffies } from "./buffies.js";

let playerData = null;
let battleStats = null;
let url = null

async function fetchData() {
    try {
        const tag = document.getElementById("playerTag").value;
        const playerResponse = await fetch( `${url}/api/player/${tag}`);

        if (!playerResponse.ok) {
            throw new Error("Could not load one or more data files.");
        }

        const playerDataResult = await playerResponse.json();

        console.log(playerDataResult)
        playerData = playerDataResult["accountInfo"];
        battleStats = playerDataResult["battleLogs"];
        displayPlayerData();

    } catch (error) {
        console.error("Error loading player data:", error);
    }
}

async function getPlayerData() {
    await fetchData();
}

function displayPlayerData() {
    if (!playerData) {
        console.error("No player data available to display.");
        return;
    }

    const playerInfoDiv = document.getElementById("playerInfo");
    const collectiblesDiv = document.getElementById("collectibles");
    const gameStatsDiv = document.getElementById("gameStats");
    const battleStatsDiv = document.getElementById("battleStats");
    const playerTagInput = document.getElementById("playerTag");
    const selectedPlayerTag = (playerTagInput?.value || playerData.tag || "").trim();

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
          <div><strong>Name</strong><span>${playerData.name}</span></div>
          <div><strong>Tag</strong><span>${playerData.tag}</span></div>
          <div><strong>Trophies</strong><span>${playerData.trophies}</span></div>
          <div><strong>Club</strong><span>${playerData.club?.name || "No club"}</span></div>
          <div><strong>Average Trophies per Brawler</strong><span>${averageTrophies}</span></div>
          <div><strong>Total Prestige</strong><span>${totalPrestige}</span></div>
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
        <h2 class="card-title">Game Stats</h2>
        <div class="info-grid">
          <div><strong>3vs3Victories</strong><span>${playerData["3vs3Victories"] || 0}</span></div>
          <div><strong>Showdown Victories</strong><span>${playerData["soloVictories"] || 0}</span></div>
          <div><strong>Current Ranked Elo</strong><span>${playerData.rankedElo || 0}</span></div>
          <div><strong>Current Ranked Name</strong><span>${playerData["highestSeasonRankedRankName"] || 0}</span></div>
          <div><strong>Top Ranked Elo</strong><span>${playerData["highestAllTimeRankedElo"] || 0}</span></div>
          <div><strong>Top Ranked Name</strong><span>${playerData["highestAllTimeRankedRankName"] || 0}</span></div>
          <div><strong>Recent Wins</strong><span>${battleStats.wins}</span></div>
          <div><strong>Recent Losses</strong><span>${battleStats.losses}</span></div>
          <div><strong>Recent Win Rate</strong><span>${battleStats.winRate}%</span></div>
        </div>
      </div>
    `;

    const battleStatsHtml = `
  <div class="card">
    <h2 class="card-title">Battle Statistics</h2>

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
  </div>
`;

const favoritesHtml = `
  <div class="card">
    <h2 class="card-title">Favorites</h2>

    <div class="info-grid">

      <div>
        <strong>Top Brawler</strong>
        <span>
          ${battleStats.top_brawlers?.[0]?.brawler || "N/A"}
        </span>
      </div>

      <div>
        <strong>Games Played</strong>
        <span>
          ${battleStats.top_brawlers?.[0]?.games || 0}
        </span>
      </div>

      <div>
        <strong>Top Gamemode</strong>
        <span>
          ${battleStats.top_gamemodes?.[0]?.gamemode || "N/A"}
        </span>
      </div>

      <div>
        <strong>Games Played</strong>
        <span>
          ${battleStats.top_gamemodes?.[0]?.games || 0}
        </span>
      </div>

    </div>
  </div>
`;

const rankingsHtml = `
  <div class="card">
    <h2 class="card-title">Top Brawlers</h2>

    <div class="info-grid">
      ${
        battleStats.top_brawlers.map((brawler, index) => `
          <div>
            <strong>#${index + 1} ${brawler.brawler}</strong>
            <span>${brawler.games} games</span>
          </div>
        `).join("")
      }
    </div>
  </div>


  <div class="card">
    <h2 class="card-title">Top Gamemodes</h2>

    <div class="info-grid">
      ${
        battleStats.top_gamemodes.map((mode, index) => `
          <div>
            <strong>#${index + 1} ${mode.gamemode}</strong>
            <span>${mode.games} games</span>
          </div>
        `).join("")
      }
    </div>
  </div>
`;


    playerInfoDiv.innerHTML = playerInfoHtml;
    collectiblesDiv.innerHTML = collectlibesHtml;
    gameStatsDiv.innerHTML = gameStatsHtml;
    battleStatsDiv.innerHTML = gameStatsHtml + battleStatsHtml + favoritesHtml + rankingsHtml;
}

window.getPlayerData = getPlayerData;