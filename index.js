///////// ------------------    MENU HAMBURGER    ------------------- //////////


const hamb = document.getElementById('hambBtn');
const menu = document.getElementById('mobileMenu');

hamb.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menu.setAttribute('aria-hidden', !open);
});







///////// ------------------    CONTENUE DE LA CARTE    ------------------- //////////


const container = document.getElementById("games-container");
const newContainer = document.getElementById("new-game-container");
const discountContainer = document.getElementById("featured-games");

// --- FONCTION : CRÉER UNE CARTE DE JEU ---
function createCard(game) {
  const card = document.createElement("div");
  card.classList.add("game-card");

  // gestion du prix et de la promo
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
    <img src="${game.image}" alt="${game.title}">
    <p class="price">${prices}</p>
  `;
  
  // badge "-xx%"
  if (game.discount && Number(game.discount) > 0) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "discount");
    badge.textContent = `-${game.discount}%`;
    const priceElement = card.querySelector(".price");
    priceElement.prepend(badge);
  }

    // --- ANIMATION : défilement des screens au survol ---
 if (game.screens && game.screens.length > 0) {
  const imgElement = card.querySelector("img");
  const originalSrc = imgElement.src;
  let currentIndex = 0;
  let intervalId;
  let timeoutId;

  card.addEventListener("mouseenter", () => {
    // Ajoute un zoom fluide
    imgElement.style.transition = "transform 0.3s ease, opacity 0.5s ease";

    // Attend 300 ms avant de démarrer le défilement
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % game.screens.length;

        // Effet de fondu lors du changement d'image
        imgElement.style.opacity = "0";
        setTimeout(() => {
          imgElement.src = game.screens[currentIndex];
          imgElement.style.opacity = "1";
        }, 300);
      }, 1500); // changement toutes les 1.5 secondes
    }, 1);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);

    // Retour à la jaquette d'origine
    imgElement.style.opacity = "0";
    setTimeout(() => {
      imgElement.src = originalSrc;
      imgElement.style.opacity = "1";
    }, 10);

    // Retire le zoom
    imgElement.style.transform = "scale(1)";
  });
}


  return card;
}






///////// ------------------    APPELLE DATA DU FICHIER JSON    ------------------- //////////


async function loadGames() {
  try {
    const response = await fetch("games.json");
    const games = await response.json();

    // --- SECTION BANNIÈRE ---
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

    // --- PARTICULES D’ANIMATION ---
    const Pcontainer = document.querySelector("#banner .particles");
    if (Pcontainer) {
      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        Pcontainer.appendChild(p);

        const size = Math.random() * 3 + 10;
        const hue = 50 + Math.random() * 30;
        const duration = 1 + Math.random() * 4;
        const bannerRect = banner.getBoundingClientRect();
        const bannerWidth = bannerRect.width;

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

        gsap.to(p, {
          y: -100,
          opacity: 0,
          duration,
          ease: "none",
          repeat: -1,
          delay: Math.random() * duration,
        });

        gsap.to(p, {
          x: `+=${Math.random() * 800 + 50}`,
          duration: Math.random() * 8 + 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }

    // --- VIDE LES CONTAINERS ---
    container.innerHTML = "";
    newContainer.innerHTML = "";
    discountContainer.innerHTML = "";

    if (hotBanner) {
      const hotCard = createCard(hotBanner);
      container.appendChild(hotCard);
    }

    ///////// ------------------    PROMOTION CONTAINER    ------------------- //////////


    // --- MISE EN PAGE SPÉCIALE POUR LES JEUX EN PROMO ---
    function createDiscountLayout(games) {
  const discounted = games
    .filter(g => g && g.discount && Number(g.discount) > 0)
    .sort((a, b) => Number(b.discount) - Number(a.discount));

  // vide l'ancien contenu
  discountContainer.innerHTML = "";

  if (discounted.length === 0) return;

  // Si moins de 4 jeux, affiche simplement une grille de cartes (identique au games-container)
  if (discounted.length < 4) {
    const grid = document.createElement("div");
    grid.classList.add("discount-grid");
    discounted.forEach(g => {
      const c = createCard(g);
      grid.appendChild(c);
    });
    discountContainer.appendChild(grid);
    return;
  }

  // Prend les 4 premiers pour le layout spécial
  const [left, center, rightTop, rightBottom] = discounted.slice(0, 4);

  const layout = document.createElement("div");
  layout.classList.add("discount-layout");

  // Utilise createCard pour garder le même look que games-container
  const leftCard = createCard(left);
  leftCard.classList.add("left-game", "discount-card");

  const centerCard = createCard(center);
  centerCard.classList.add("center-game", "discount-card");

  const topRightCard = createCard(rightTop);
  topRightCard.classList.add("top-game", "discount-card");

  const bottomRightCard = createCard(rightBottom);
  bottomRightCard.classList.add("bottom-game", "discount-card");

  const rightCol = document.createElement("div");
  rightCol.classList.add("right-column");
  rightCol.appendChild(topRightCard);
  rightCol.appendChild(bottomRightCard);

  layout.appendChild(leftCard);
  layout.appendChild(centerCard);
  layout.appendChild(rightCol);

  discountContainer.appendChild(layout);
}

    const newGamesData = [];

    games.forEach(game => {
      const card = createCard(game);

      container.appendChild(card);

      if (game.isNew === true || game.isNew === "true") {
        newGamesData.push(game);
      }

    });

    // --- CRÉATION DU LAYOUT SPÉCIAL ---
    createDiscountLayout(games);

    // --- CARROUSEL ---
    if (newGamesData.length > 0) initCarousel(newGamesData);

  } catch (error) {
    console.error("Erreur de chargement JSON :", error);
  }
}







///////// ------------------    FUNCTION DU CAROUSEL    ------------------- //////////
function initCarousel(newGamesData) {
  let index = 0;
  const delay = 4000;
  let intervalId;
  let isPaused = false;

  newContainer.innerHTML = `
    <div class="carousel-slot">
      <i class="fa-solid fa-angle-left carousel-arrow left" role="button" aria-label="Previous"></i>
      <div class="carousel-content"></div>
      <i class="fa-solid fa-chevron-right carousel-arrow right" role="button" aria-label="Next"></i>
    </div>
    <div class="carousel-dots" aria-hidden="false"></div>
  `;

  const slot = newContainer.querySelector('.carousel-slot');
  const content = newContainer.querySelector('.carousel-content');
  const next = newContainer.querySelector('.carousel-arrow.right');
  const prev = newContainer.querySelector('.carousel-arrow.left');
  const dotsContainer = newContainer.querySelector('.carousel-dots');

  // create dots (rectangles) for each slide
  const dots = newGamesData.map((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'carousel-dot';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Aller au jeu ${i + 1}`);
    btn.dataset.index = i;
    btn.addEventListener('click', () => {
      index = i;
      showGame(index);
      restartAuto();
    });
    dotsContainer.appendChild(btn);
    return btn;
  });

  function updateDots(i) {
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  function showGame(i) {
    // supprime proprement la carte précédente
    const oldCard = content.querySelector('.carousel-card');
    if (oldCard) {
      gsap.to(oldCard, {
        opacity: 0,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.out",
        onComplete: () => oldCard.remove()
      });
    }

    const card = createCard(newGamesData[i]);
    card.classList.add('carousel-card');

    content.style.position = "relative";
    gsap.set(card, { position: "absolute", opacity: 0, scale: 1 });
    content.appendChild(card);

    gsap.to(card, { opacity: 1, scale: 1, duration: 0.28, ease: "power2.out" });

    // update dots visual
    updateDots(i);
  }

  function nextGame() {
    index = (index + 1) % newGamesData.length;
    showGame(index);
  }
  function prevGame() {
    index = (index - 1 + newGamesData.length) % newGamesData.length;
    showGame(index);
  }

  next.addEventListener('click', () => { nextGame(); restartAuto(); });
  prev.addEventListener('click', () => { prevGame(); restartAuto(); });

  // pause/resume on hover over the visible carousel area
  slot.addEventListener('mouseenter', () => {
    isPaused = true;
    clearInterval(intervalId);
  });
  slot.addEventListener('mouseleave', () => {
    isPaused = false;
    startAuto();
  });

  function startAuto() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (!isPaused) nextGame();
    }, delay);
  }
  function restartAuto() {
    clearInterval(intervalId);
    startAuto();
  }

  // initial
  showGame(index);
  startAuto();
}
loadGames();

// --- ÉCRAN DE CHARGEMENT ---
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("hidden"); // masque l'écran après chargement complet
});