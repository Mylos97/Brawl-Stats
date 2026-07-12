API_KEY = ""
BRAWL_API = "https://api.brawlstars.com/v1"

function getPlayerData() {
  const playerTag = document.getElementById("playerTag").value.trim();
  const encodedTag = encodeURIComponent(`#${playerTag}`);
  const url = `${BRAWL_API}/players/${encodedTag}`;
  console.log("Player Tag:", playerTag);
  fetch(url, {
    headers: {
      "Authorization": `Bearer ${API_KEY}`
    },
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      console.log("Player Data:", data);
      displayPlayerData(data);
    })
    .catch(error => {
      console.error("Error fetching player data:", error);
    });

  return "";
}