/*
// --- Menu hamburger mobile ---
const hamb = document.getElementById('hambBtn');
const menu = document.getElementById('mobileMenu');
hamb.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menu.setAttribute('aria-hidden', !open);
});

// --- Containers globaux ---
const container = document.getElementById("games-container");
const newContainer = document.getElementById("new-game-container");
const discountContainer = document.getElementById("discount-game-container");

// --- Utilitaire : créer une carte à partir d'un objet jeu ---
function createCard(game) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  // prix (gestion promo)
  let priceHTML = `${game.price}€`;
  if (game.discount && Number(game.discount) > 0) {
    const newPrice = (Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2);
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

  // badges
  if (game.isNew === true || game.isNew === "true") {
    const badge = document.createElement("span");
    badge.classList.add("badge", "new");
    badge.textContent = "NEW";
    card.appendChild(badge);
  }
  if (game.discount && Number(game.discount) > 0) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "discount");
    badge.textContent = `-${game.discount}%`;
    card.appendChild(badge);
  }

  return card;
}

// --- Chargement et affichage des jeux ---
async function loadGames() {
  try {
    const response = await fetch("games.json");
    const games = await response.json();

    // vider les containers
    container.innerHTML = "";
    newContainer.innerHTML = "";
    discountContainer.innerHTML = "";

    // tableau pour stocker les données des nouveaux jeux (pour le carrousel)
    const newGamesData = [];

    games.forEach(game => {
      // créer la carte de base
      const card = createCard(game);

      // si jeu nouveau -> on le garde dans newGamesData (pour le carrousel)
      if (game.isNew === true || game.isNew === "true") {
        newGamesData.push(game);
      }

      // si promo -> on ajoute une copie dans discountContainer
      if (game.discount && Number(game.discount) > 0) {
        discountContainer.appendChild(card.cloneNode(true));
      }

      // si ni nouveau ni promo -> on l'affiche dans la liste principale
      if (!(game.isNew === true || game.isNew === "true") && !(game.discount && Number(game.discount) > 0)) {
        container.appendChild(card);
      }
    });

    // --- CARROUSEL pour les nouveaux jeux (sans progress bar) ---
    if (newGamesData.length > 0) {
      let index = 0;
      const delay = 4000;
      let intervalId = null;
      let isPaused = false;

      newContainer.innerHTML = `
        <div class="carousel-slot">
          <i class="fa-solid fa-angle-left carousel-arrow left"></i>
          <div class="carousel-content"></div>
          <i class="fa-solid fa-chevron-right carousel-arrow right"></i>
        </div>
      `;
      const slot = newContainer.querySelector('.carousel-slot');
      const content = newContainer.querySelector('.carousel-content');
      const next = newContainer.querySelector('.fa-chevron-right');
      const prev = newContainer.querySelector('.fa-angle-left');

      function showGame(i) {
        content.innerHTML = "";
        const oldCard = content.querySelector('.carousel-card');
        if (oldCard) {
          oldCard.classList.remove('visible');
          setTimeout(() => oldCard.remove(), 500);
        }
        
        const card = createCard(newGamesData[i]);
        card.classList.add('carousel-card');
        content.appendChild(card);

        // Fade in
        requestAnimationFrame(() => {
          card.classList.add('visible');
        });
      }

      function nextGame() {
        index = (index + 1) % newGamesData.length;
        showGame(index);
      }
      function prevGame() {
        index = (index - 1 + newGamesData.length) % newGamesData.length;
        showGame(index);
      }

      next.onclick = () => { nextGame(); restartAuto(); };
      prev.onclick = () => { prevGame(); restartAuto(); };

      // Pause/resume on hover (carousel only)
      slot.onmouseenter = () => {
        isPaused = true;
        clearInterval(intervalId);
      };

      slot.onmouseleave = () => {
        isPaused = false;
        startAuto();
      };

      function startAuto() {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          if (!isPaused) nextGame();
        }, delay);
      }
      function restartAuto() {
        startAuto();
        showGame(index);
      }

      showGame(index);
      startAuto();
    }

  } catch (error) {
    console.error("Erreur de chargement JSON :", error);
  }
}

loadGames();
*/

// --- MENU HAMBURGER ---
const hamb = document.getElementById('hambBtn');
const menu = document.getElementById('mobileMenu');

hamb.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menu.setAttribute('aria-hidden', !open);
});


////////////////////////////////////////////////////////////////////////////////////////


// --- CONTAINERS PRINCIPAUX ---
const container = document.getElementById("games-container");
const newContainer = document.getElementById("new-game-container");
const discountContainer = document.getElementById("discount-game-container");

// --- FONCTION : CRÉER UNE CARTE DE JEU ---
function createCard(game) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  // gestion du prix et de la promo
  let priceHTML = `${game.price}€`;
  if (game.discount && Number(game.discount) > 0) {
    const newPrice = (Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2);
    priceHTML = `
      <span class="old-price">${game.price}€</span>
      <span class="new-price">${newPrice}€</span>
    `;
  }

  // contenu de la carte
  card.innerHTML = `
    <img src="${game.image}" alt="${game.title}">
    <h2>${game.title}</h2>
    <p class="price">${priceHTML}</p>
    <button>Ajouter au panier</button>
  `;
/*
  // badge "NEW"
  if (game.isNew === true || game.isNew === "true") {
    const badge = document.createElement("span");
    badge.classList.add("badge", "new");
    badge.textContent = "NEW";
    card.appendChild(badge);
  }
*/
  // badge "-xx%"
  if (game.discount && Number(game.discount) > 0) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "discount");
    badge.textContent = `-${game.discount}%`;
    card.appendChild(badge);
  }

  return card;
}

// --- CHARGEMENT DU FICHIER JSON ---
async function loadGames() {
  try {
    const response = await fetch("games.json");
    const games = await response.json();

    const banner = document.getElementById("banner");
    const hotBanner = games.find(game => game.isHot === true || game.isHot === "true");

    if (hotBanner) {
      banner.innerHTML = `
      <a href="${hotBanner.link}" class="banner-link">
        <img src="${hotBanner.image}" alt="${hotBanner.title}" class="banner-aura">
        <div class="dispoBtn">NOW AVAILABLE</div>
      </a>
      <div class="particles"></div>
        `;
    }

    const Pcontainer = document.querySelector("#banner .particles");
    if (!Pcontainer) return;

    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      Pcontainer.appendChild(p);

      // Taille, couleur, durée aléatoires
      const size = Math.random() * 3 + 10;
      const hue = 50 + Math.random() * 30;
      const duration = 1 + Math.random() * 4;
      const bannerRect = banner.getBoundingClientRect();
      const bannerWidth = bannerRect.width;
      const bannerHeight = bannerRect.height;
      // Applique le style de la particule
      gsap.set(p, {
        width: size,
        height: size,
        backgroundColor: `hsl(${hue}, 90%, 70%)`,
        boxShadow: `0 0 ${size * 3}px hsl(${hue}, 100%, 65%)`,
        x: Math.random() * bannerWidth,
        y: window.innerHeight + Math.random() * 1,
        opacity: Math.random() * 1 + 1,
        scale: size / 15,
      });

      // Animation principale (monte)
      gsap.to(p, {
        y: -100,
        opacity: 0,
        duration,
        ease: "none",
        repeat: -1,
        delay: Math.random() * duration,
      });

      // Animation de flottement gauche/droite
      gsap.to(p, {
        x: `+=${Math.random() * 800 + 50}`, // mouvement droite gauche en px
        duration: Math.random() * 8 + 5, // mouvement de droite a gauche vitesse en secondes
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }






    // on vide tout avant d'ajouter
    container.innerHTML = "";
    newContainer.innerHTML = "";
    discountContainer.innerHTML = "";

    const newGamesData = [];

    // on trie les jeux selon leur type
    games.forEach(game => {
      const card = createCard(game);

      if (game.isNew === true || game.isNew === "true") {
        newGamesData.push(game);
      }

      if (game.discount && Number(game.discount) > 0) {
        discountContainer.appendChild(card.cloneNode(true));
      }

      if (!(game.isNew === true || game.isNew === "true") && !(game.discount && Number(game.discount) > 0)) {
        container.appendChild(card);
      }
    });

    // --- CARROUSEL DES NOUVEAUX JEUX ---
    if (newGamesData.length > 0) initCarousel(newGamesData);

  } catch (error) {
    console.error("Erreur de chargement JSON :", error);
  }
}

// --- FONCTION : INITIALISER LE CARROUSEL ---
function initCarousel(newGamesData) {
  let index = 0;
  const delay = 4000;
  let intervalId;

  // structure du carrousel
  newContainer.innerHTML = `
    <div class="carousel-slot">
      <i class="fa-solid fa-angle-left carousel-arrow left"></i>
      <div class="carousel-content"></div>
      <i class="fa-solid fa-chevron-right carousel-arrow right"></i>
    </div>
  `;

  const content = newContainer.querySelector('.carousel-content');
  const next = newContainer.querySelector('.fa-chevron-right');
  const prev = newContainer.querySelector('.fa-angle-left');

  // affiche le jeu à l’index donné
  function showGame(i) {
  // Supprime proprement la carte précédente
  const oldCard = content.querySelector('.carousel-card');
  if (oldCard) {
    gsap.to(oldCard, {
      opacity: 0,
      scale: 1,
      duration: 0.1,
      ease: "power2.out",
      onComplete: () => oldCard.remove()
    });
  }

  // Crée la nouvelle carte
  const card = createCard(newGamesData[i]);
  card.classList.add('carousel-card');

  // Important : positionne le parent en relatif (pour pas que ça sorte de la nav)
  content.style.position = "relative";

  // Place la carte en absolute mais centrée dans le container
  gsap.set(card, {
    position: "absolute",
    opacity: 0,
    scale: 1,
  });

  content.appendChild(card);

  // Animation d’apparition : fade + zoom sur place
  gsap.to(card, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  });
}

  function nextGame() {
    index = (index + 1) % newGamesData.length;
    showGame(index);
  }

  function prevGame() {
    index = (index - 1 + newGamesData.length) % newGamesData.length;
    showGame(index);
  }

  next.onclick = () => { nextGame(); restartAuto(); };
  prev.onclick = () => { prevGame(); restartAuto(); };

  function startAuto() {
    clearInterval(intervalId);
    intervalId = setInterval(nextGame, delay);
  }

  function restartAuto() {
    clearInterval(intervalId);
    startAuto();
  }

  // premier affichage
  showGame(index);
  startAuto();
}

// --- DÉMARRAGE ---
loadGames();


