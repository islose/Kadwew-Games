let game;

///////// ------------------    ÉCRAN DE CHARGEMENT    ------------------- //////////
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("hidden");
});


const hamb = document.getElementById('hambBtn');
const mobileMenu = document.getElementById('mobileMenu');
const panier = document.getElementById('panier-btn');
const panierMenu = document.getElementById('panier-menu');

hamb.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle('open');
  mobileMenu.setAttribute('aria-hidden', !open);
});

panier.addEventListener("click", () => {
  const open = panierMenu.classList.toggle('open');
  panierMenu.setAttribute('aria-hidden', !open);
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

  

  let prices;

  if (Number(game.price) === 0) {
    prices = `<span class="free">Free-To-Play</span>`;
  }

  else if (game.discount && Number(game.discount) > 0) {
    const newPrice = (Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2);
    prices = `
    <span class="old-price">${game.price}€</span>
    <span class="new-price">${newPrice}€</span>
    `;
  }

  else {
    prices = `${game.price}€`;
  }

  card.innerHTML = `
    <h2 class="game-title">${game.title}</h2>
    <img class="main-image" src="${game.image}" alt="${game.title}">
    <div class="price" id="price">${prices}</div>
    <div class="game-information" id="game-information">
        <button class="buy-btn" id="buy-btn">Ajouter au panier</button>
    </div>
    <div class="description" id="description">${game.description}</div>
    <div class="screens">
      <div class="screensH1">
        <h1>Screenshots</h1>
      </div>
      ${screensHTML}
    </div>
  `;

  if (game.discount && Number(game.discount) > 0) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "discount");
    badge.textContent = `-${game.discount}%`;
    const priceElement = card.querySelector(".price");
    priceElement.prepend(badge);
  }


  return card;
}

async function loadGame() {
  const response = await fetch("games.json");
  const games = await response.json();

  game = games.find(g => slugify(g.title) === slugFromUrl);

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

  const buyBtn = document.getElementById('buy-btn');

  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      addToCart(game.title, game.price, game.discount, game.image);
    });
  }
}

loadGame();