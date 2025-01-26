const games = document.getElementById("games");
const searchbar = document.getElementById("search");

searchbar.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase();
    const gameCards = games.querySelectorAll("#gameCard");

    gameCards.forEach((card) => {
        const gameNameElement = card.querySelector("#cardGameName");
        const gameName = gameNameElement.textContent.toLowerCase();

        if (gameName.includes(input) || input === "") {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

searchbar.addEventListener("focusout", () => {
    searchbar.value = "";
});