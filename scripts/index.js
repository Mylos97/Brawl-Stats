import { fetchPlayerSearch } from "./fetchPlayer.js";

const playerTagInput = document.getElementById("playerTag");
const fetchButton = document.getElementById("fetchButton");
const autocompleteList = document.getElementById("autocomplete-list");
const KEY = "recent_searches";
let typingTimeout;

function navigateToPlayerInfo() {
    const playerTag = playerTagInput.value.trim().replace(/^#/, "");

    if (!playerTag) {
        window.alert("Please enter a player tag.");
        playerTagInput.focus();
        return;
    }

    window.location.href = `player-info.html?tag=${encodeURIComponent(playerTag)}`;
}

fetchButton.addEventListener("click", navigateToPlayerInfo);

playerTagInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        navigateToPlayerInfo();
    }
});

function getRecentLS() {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
        return [];
    }
}

function setRecentLS(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

function addRecentSearch(player) {
    const searches = getRecentLS();

    if (searches.some(search => search.tag === player.tag)) {
        return;
    }

    searches.push(player);

    if (searches.length > 4) searches.shift();

    setRecentLS(searches);
}


async function createAutocomplete(values) {
    if (!values || values.length === 0) {
        autocompleteList.classList.remove("show");
        autocompleteList.innerHTML = "";
        return;
    }

    autocompleteList.classList.add("show");
    autocompleteList.innerHTML = values
        .map(({ tag, name }) => `
            <button type="button" class="autocomplete-item" data-tag="${tag}" data-name="${name}">
                <span>${name}</span>
                <small>#${tag}</small>
            </button>
        `)
        .join("");
}

autocompleteList.addEventListener("click", (event) => {
    const item = event.target.closest(".autocomplete-item");

    if (!item) return;

    const tag = item.dataset.tag;
    const name = item.dataset.name;

    addRecentSearch({ tag, name });
    playerTagInput.value = tag;
    autocompleteList.classList.remove("show");
    autocompleteList.innerHTML = "";
    playerTagInput.focus();
});

playerTagInput.addEventListener("input", (event) => {
    const value = event.target.value.trim();

    window.clearTimeout(typingTimeout);

    if (!value || value.length < 3) {
        autocompleteList.classList.remove("show");
        autocompleteList.innerHTML = "";
        return;
    }

    typingTimeout = window.setTimeout(async () => {
        const response = await fetchPlayerSearch(value);
        createAutocomplete(response);
    }, 250);
});

playerTagInput.addEventListener("focus", () => {
    const value = playerTagInput.value
    console.log("event", value)
    if (value.length > 0) {
        return;
    }

    const list = getRecentLS().map(({tag, name}) => ({ tag, name }))
    createAutocomplete(list);
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-container")) {
        autocompleteList.classList.remove("show");
    }
});