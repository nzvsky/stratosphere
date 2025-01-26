const script = document.currentScript;
const src = new URL(script.src, window.location.href);
const params = new URLSearchParams(src.search);
const fileName = params.get('file');
const filePath = `../json/${fileName}`;

const cdn = "https://nzvsky-cdn.github.io/";

const assets = cdn + "assets/";
const covers = assets + "covers/";
const utilcdn = cdn + "utilities/"
const cdn1 = cdn + "games-1/"

function parse(json) {
    fetch(filePath)
        .then((response) => response.json())
        .then((data) => {
            json(data);
        });
};

parse((data) => {
    data.forEach((game) => {
        const games = document.getElementById("games")

        const div = document.createElement("div");
        const coverImage = document.createElement("img");
        const gameName = document.createElement("p");

        div.setAttribute("id", "gameCard");;
        coverImage.setAttribute("id", "cardCoverImage");
        gameName.setAttribute("id", "cardGameName");

        coverImage.src = covers + game.image;
        coverImage.draggable = false;
        gameName.textContent = game.name;
        gameName.style.fontSize = game.fontsize + "px";

        div.appendChild(coverImage);
        div.appendChild(gameName);
        games.appendChild(div);

        div.addEventListener("click", () => {
            if (game.embed) {
                const tab = window.open("about:blank", "_blank");
                const iframe = tab.document.createElement("iframe");

                let path = game.path;
                let url = null;

                path = path.replace("${cdn1}", cdn1);

                if (game.cdn === 1) {
                    url = cdn1 + path;
                } else if (game.cdn === "utils") {
                    url = utilcdn + path;
                };

                tab.document.body.style.backgroundColor = "transparent";
                tab.document.body.style.margin = 0;
                tab.document.body.style.padding = 0;
                tab.document.body.style.overflow = "hidden";
                
                iframe.src = url;
                iframe.allowFullscreen = true;
                iframe.style.width = "100%";
                iframe.style.height = "100%";
                iframe.style.border = "none";

                tab.document.body.appendChild(iframe);
            } else {
                window.open(game.url, "_blank");
            };
        });
    });
});