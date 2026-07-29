const statsTab = document.getElementById("statsTab");
const graphsTab = document.getElementById("graphsTab");

const statsPage = document.getElementById("cardShowcase");
const graphsPage = document.getElementById("graphShowcase");


statsTab.addEventListener("click", () => {
    statsPage.style.display = "grid";
    graphsPage.style.display = "none";

    statsTab.classList.add("active");
    graphsTab.classList.remove("active");
});


graphsTab.addEventListener("click", () => {
    statsPage.style.display = "none";
    graphsPage.style.display = "grid";

    graphsTab.classList.add("active");
    statsTab.classList.remove("active");
});