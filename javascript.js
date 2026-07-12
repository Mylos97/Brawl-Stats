API_KEY = ""
BRAWL_API = "https://brawl-stats-backend-wxvo.onrender.com/api"

var playerData = ""

function getPlayerData() {
  const playerTag = document.getElementById("playerTag").value.trim();
  const url = `${BRAWL_API}/player/${encodedTag}`;
  console.log("Player Tag:", playerTag);
  fetch(url)  
    .then(response => response.json())
    .then(data => {
      console.log("Player Data:", data);
      playerData = data;
    })
    .catch(error => {
      console.error("Error fetching player data:", error);
    });
}

function displayPlayerData() {
  if (!playerData) {
    console.error("No player data available to display.");
    return;
  }

  const playerInfoDiv = document.getElementById("playerInfo");
  playerInfoDiv.innerHTML = `
    <h2>Player Info</h2>
    <p>Name: ${playerData.name}</p>
    <p>Tag: ${playerData.tag}</p>
    <p>Trophies: ${playerData.trophies}</p>
    <p>Highest Trophies: ${playerData.highestTrophies}</p>
    <p>Level: ${playerData.level}</p>
  `;
}   