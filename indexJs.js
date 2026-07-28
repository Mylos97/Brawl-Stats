function openPlayerInfo() {
    const playerTag = document.getElementById("playerTag").value.trim();

    if (!playerTag) {
        alert("Please enter a player tag");
        return;
    }

    window.location.href = `playerInfo.html?tag=${encodeURIComponent(playerTag)}`;
}