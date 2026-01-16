///////// ------------------    ÉCRAN DE CHARGEMENT    ------------------- //////////
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("hidden"); // masque l'écran après chargement complet
});


function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

const params = new URLSearchParams(window.location.search);
const slugFromUrl = params.get("game");

const gameBox = document.getElementById("game-box");

function createCardGames(game) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  let screensHTML = "";

  if (game.screens && game.screens.length > 0) {
    game.screens.forEach(screen => {
      screensHTML += `<img src="${screen}" alt="${game.title} screen">`;
    });
  }

  card.innerHTML = `
    <img class="main-image" src="${game.image}" alt="${game.title}">
    <div class="screens">
      ${screensHTML}
    </div>
  `;

  return card;
}

async function loadGame() {
  const response = await fetch("games.json");
  const games = await response.json();

  const game = games.find(g => slugify(g.title) === slugFromUrl);

  if (!game) {
    document.body.innerHTML = "Jeu introuvable";
    return;
  }

  const bgDiv = document.querySelector('.background-blur');
  if (bgDiv) {
    bgDiv.style.backgroundImage = `url('${game.image}')`;
  }

  gameBox.innerHTML = "";
  gameBox.appendChild(createCardGames(game));
}

loadGame();
