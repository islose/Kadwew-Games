const container = document.getElementById("games-container");
const newContainer = document.getElementById("new-game-container");
const discountContainer = document.getElementById("discount-game-container");

async function loadGames() {
  try {
    const response = await fetch("games.json");
    const games = await response.json();

    const allContainer = document.getElementById("games-container");
    const newContainer = document.getElementById("new-game-container");
    const discountContainer = document.getElementById("discount-game-container");

    // On vide les containers
    allContainer.innerHTML = "";
    newContainer.innerHTML = "";
    discountContainer.innerHTML = "";

    games.forEach(game => {
      const card = document.createElement("div");
      card.classList.add("game-card");

      // Prix normal ou promo
      let priceHTML = `${game.price}€`;
      if (game.discount && game.discount > 0) {
        const newPrice = (game.price * (1 - game.discount / 100)).toFixed(2);
        priceHTML = `
          <span class="old-price">${game.price}€</span>
          <span class="new-price">${newPrice}€</span>
        `;
      }

      card.innerHTML = `
        <img src="${game.image}" alt="${game.title}">
        <h2>${game.title}</h2>
        <p class="price">${priceHTML}</p>
        <button>Ajouter au panier</button>
      `;

      // Badge NEW
      if (game.isNew) {
        const badge = document.createElement("span");
        badge.classList.add("badge", "new");
        badge.textContent = "NEW";
        card.appendChild(badge);
        newContainer.appendChild(card.cloneNode(true));
      }

      // Badge promo
      if (game.discount && game.discount > 0) {
        const badge = document.createElement("span");
        badge.classList.add("badge", "discount");
        badge.textContent = `-${game.discount}%`;
        card.appendChild(badge);
        discountContainer.appendChild(card.cloneNode(true));
      }

      // Si le jeu n'est ni nouveau ni en promo → on l'ajoute dans "games"
      if (!game.isNew && !(game.discount && game.discount > 0)) {
        allContainer.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Erreur de chargement JSON :", error);
  }
}

loadGames();


const hamb = document.getElementById('hambBtn');
    const menu = document.getElementById('mobileMenu');
    hamb.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menu.setAttribute('aria-hidden', !open);
    });