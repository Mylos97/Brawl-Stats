const playerTagInput = document.getElementById("playerTag");
const fetchButton = document.getElementById("fetchButton");

function navigateToPlayerInfo() {
    const playerTag = playerTagInput.value.trim().replace(/^#/, "");

    if (!playerTag) {
        window.alert("Please enter a player tag.");
        playerTagInput.focus();
        return;
    }

    window.location.href = `playerInfo.html?tag=${encodeURIComponent(playerTag)}`;
}

fetchButton.addEventListener("click", navigateToPlayerInfo);
playerTagInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        navigateToPlayerInfo();
    }
});