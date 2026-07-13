  let playerData = null;

  function getPlayerData() {
    fetch("mybrawler.json")
      .then(response => response.json())
      .then(data => {
        console.log("Local Player Data:", data);
        playerData = data;
        displayPlayerData();
      })
      .catch(error => {
        console.error("Error loading player data:", error);
      });
  }

  function displayPlayerData() {
    if (!playerData) {
      console.error("No player data available to display.");
      return;
    }

    const playerInfoDiv = document.getElementById("playerInfo");
    const collectiblesDiv = document.getElementById("collectibles");
    const gameStatsDiv = document.getElementById("gameStats");

    const allBrawlersLength = 104;
    const brawlers = playerData.brawlers || [];
    const topBrawlers = brawlers.sort((a, b) => b.trophies - a.trophies);
    const averageTrophies = brawlers.length > 0 ? Math.round(brawlers.reduce((sum, b) => sum + b.trophies, 0) / brawlers.length) : 0;
    const totalPrestige = playerData.totalPrestigeLevel || 0;
    const collectedStarPowers = brawlers.reduce((sum, b) => sum + b.starPowers.length, 0);
    const collectedGadgets = brawlers.reduce((sum, b) => sum + b.gadgets.length, 0);
    const collecedHyperCharges = brawlers.reduce((sum, b) => sum + b.hyperCharges.length, 0);
    const collectedGears = brawlers.reduce((sum, b) => sum + b.gears.length, 0);

    const playerInfoHtml = `
      <div class="card">
        <h2 class="card-title">General player info</h2>
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
          <div><strong>Brawlers</strong><span>${brawlers.length || 0}/${allBrawlersLength}</span></div>
          <div><strong>Star Powers</strong><span>${collectedStarPowers}/${allBrawlersLength*2}</span></div>
          <div><strong>Gadgets</strong><span>${collectedGadgets}/${allBrawlersLength*2}</span></div>
          <div><strong>Hyper Charges</strong><span>${collecedHyperCharges}/${allBrawlersLength}</span></div>
          <div><strong>Gears</strong><span>${collectedGears}/${allBrawlersLength*8}</span></div>
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
        </div>
      </div>
    `;

    playerInfoDiv.innerHTML = playerInfoHtml;
    collectiblesDiv.innerHTML = collectlibesHtml;
    gameStatsDiv.innerHTML = gameStatsHtml;
  }  