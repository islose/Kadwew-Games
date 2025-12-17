///////// ------------------    ÉCRAN DE CHARGEMENT    ------------------- //////////
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("hidden"); // masque l'écran après chargement complet
});


///////// ------------------    MENU HAMBURGER    ------------------- //////////


const hamb = document.getElementById('hambBtn');
const menu = document.getElementById('mobileMenu');

hamb.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menu.setAttribute('aria-hidden', !open);
});



///////// ------------------    CHARGEMENT DES IMAGES EN ARRIERE PLAN    ------------------- //////////


function preloadScreens (games) {
  const loads = [];

  games.forEach(game => {
    if (game.image) {
      loads.push(new Promise(res => {
        const img = new Image();
        img.onload = img.onerror = res;
        img.src = game.image;
      }));
    }
    if (Array.isArray(game.screens)) {
      game.screens.forEach(src => {
        loads.push(new Promise(res => {
          const img = new Image();
          img.onload = img.onerror = res;
          img.src = src;
        }));
      });
    }
  });
  return Promise.all(loads);
}


///////// ------------------    URL DE PAGES DES JEUX    ------------------- //////////


function slugify (text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}




///////// ------------------    CONTENUE DE LA CARTE    ------------------- //////////


const container = document.getElementById("games-container");
const newContainer = document.getElementById("new-game-container");
const discountContainer = document.getElementById("featured-games");

// --- FONCTION : CRÉER UNE CARTE DE JEU ---
function createCard(game) {
  const slug = slugify(game.title);
  const card = document.createElement("a");
  card.classList.add("game-card");
  card.href = `games.html?game=${slug}`;
  

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
    imgElement.style.transition = "transform 0.3s ease, opacity 0.5s ease";

    timeoutId = setTimeout(() => {
      // 🔹 Changement immédiat une première fois
      currentIndex = (currentIndex + 1) % game.screens.length;
      imgElement.style.opacity = "0";
      setTimeout(() => {
        imgElement.src = game.screens[currentIndex];
        imgElement.style.opacity = "1";
      }, 250);

      // 🔹 Puis on démarre la boucle toutes les 1.5 secondes
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % game.screens.length;
        imgElement.style.opacity = "0";
        setTimeout(() => {
          imgElement.src = game.screens[currentIndex];
          imgElement.style.opacity = "1";
        }, 250);
      }, 1200);
    }, 600);
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
  /*
  window.addEventListener("scroll", () => {
    if (card.matches(":hover")) {
      clearTimeout(timeoutId);
      clearInterval(intervalId);

      imgElement.style.opacity = "0";
      setTimeout(() => {
        imgElement.src = originalSrc;
        imgElement.style.opacity = "1";
      }, 10);

      imgElement.style.transform = "scale(1)";
    }
  });
  */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        clearInterval(intervalId);
        imgElement.src = originalSrc;
      }
    });
  });

observer.observe(card);
}
  return card;
}








///////// ------------------    APPELLE DATA DU FICHIER JSON    ------------------- //////////


async function loadGames() {
  try {
    const response = await fetch("games.json");
    const games = await response.json();

    window.allGames = games;

    preloadScreens(games);

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
      const particleCount = 50;
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

    ///////// ------------------    PROMOTION CONTAINER    ------------------- //////////


    // --- MISE EN PAGE SPÉCIALE POUR LES JEUX EN PROMO ---
    function createDiscountLayout(games) {
    const discounted = games
      .filter(g => g && g.discount && Number(g.discount) > 0)
      .sort((a, b) => Number(b.discount) - Number(a.discount));

  // vide l'ancien contenu
  discountContainer.innerHTML = `
      <h2 class="discount-title">OFFERS OF THE WEEK</h2>
  `;

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
    

    
      // --- CAROUSEL --- //

    if (newGamesData.length > 0) initCarousel(newGamesData);
    

    // --- CRÉATION DU LAYOUT SPÉCIAL --- //

    createDiscountLayout(games);




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
  <h2 class="popular-title">TENDANCES AND POPULAR</h2>
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






///////// ------------------    SEARCH SUGGESTIONS    ------------------- //////////


const searchInput = document.querySelector('#search2 input') || document.getElementById('search-input');
const suggestionsContainer = document.querySelector('#search2 .search-suggestions') || document.getElementById('search-suggestions');

if (searchInput && suggestionsContainer) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    suggestionsContainer.innerHTML = "";

    if (query.length === 0) {
      suggestionsContainer.style.display = "none";
      return;
    }

    // Filtre les jeux selon la recherche (max 4)
    const filtered = window.allGames.filter(game =>
      game.title && game.title.toLowerCase().includes(query)
    ).slice(0, 4);

    if (filtered.length === 0) {
      suggestionsContainer.innerHTML = `<div class="search-suggestion" style="color:#999; padding: 10px;">Aucun résultat</div>`;
      suggestionsContainer.style.display = "block";
      return;
    }

    // Affiche les suggestions (max 4)
    filtered.forEach(game => {
      const suggestion = document.createElement('div');
      suggestion.className = 'search-suggestion';
      suggestion.style.cssText = `
        padding: 10px 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      `;
      
      // Affiche l'image + titre du jeu
      suggestion.innerHTML = `
        <img src="${game.image}" alt="${game.title}" style="width: 30px; height: 30px; object-fit: cover; border-radius: 4px;">
        <span>${game.title}</span>
      `;
      
      suggestion.addEventListener('click', () => {
        // Redirige vers le lien du jeu
        if (game.link) {
          window.open(game.link, '_blank');
        }
        searchInput.value = game.title;
        suggestionsContainer.style.display = "none";
      });

      suggestion.addEventListener('mouseenter', () => {
        suggestion.style.background = "rgba(255,255,255,0.1)";
      });
      suggestion.addEventListener('mouseleave', () => {
        suggestion.style.background = "transparent";
      });

      suggestionsContainer.appendChild(suggestion);
    });

    suggestionsContainer.style.display = "block";
  });

  // Ferme les suggestions si on clique ailleurs
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) {
      suggestionsContainer.style.display = "none";
    }
  });
}















///////// ------------------    FILTER GAMES    ------------------- //////////


let currentPriceFilter = null;
let currentSort = null;



const priceBtn = document.getElementById("price-filter-btn");
const priceDropdown = document.getElementById("price-dropdown");

const sortBtn = document.getElementById("sort-filter-btn");
const sortDropdown = document.getElementById("sort-dropdown");


function displayGames(list) {

  gsap.to("#games-container .game-card", {
    opacity: 0,
    y: -10,
    duration: 0.2,
    onComplete: () => {

      container.innerHTML = "";

      list.forEach(game => {
        const card = createCard(game);
        container.appendChild(card);
      });

      gsap.from("#games-container .game-card", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });

    }
  });
}



document.querySelectorAll("#sort-dropdown p").forEach(option => {
  option.addEventListener("click", () => {
    currentSort = option.dataset.sort;
    applyAllFilters();
    sortDropdown.classList.add("hidden");
  });
});

document.querySelectorAll("#price-dropdown p").forEach(option => {
  option.addEventListener("click", () => {
    currentPriceFilter = option.dataset.filter;
    applyAllFilters();
    priceDropdown.classList.add("hidden");
  });
});


function applyAllFilters() {
  let result = [...window.allGames];
  result = result.map(g => ({
    ...g,
    newPrice: (Number(g.price) * (1 - Number(g.discount) / 100)).toFixed(2)
  }));


  if (currentPriceFilter) {
    switch(currentPriceFilter) {
      case "allGames":
        result = result.filter(g => Number(g.price) >= 0);
        priceBtn.textContent = "Prices : All";
        break;

      case "free":
        result = result.filter(g => Number(g.price) === 0);
        priceBtn.textContent = "Prices : Free-To-Play";
        break;

      case "under10":
        result = result.filter(g => Number(g.newPrice) >= 1 && Number(g.newPrice) <= 10);
        priceBtn.textContent = "Prices : Under 10€";
        break;

      case "11-25":
        result = result.filter(g => Number(g.newPrice) >= 11 && Number(g.newPrice) <= 25);
        priceBtn.textContent = "Prices : 11€ - 25€";
        break;

      case "25-50":
        result = result.filter(g => Number(g.newPrice) >= 25 && Number(g.newPrice) <= 50);
        priceBtn.textContent = "Prices : 25€ - 50€";
        break;

      case "50plus":
        result = result.filter(g => Number(g.newPrice) > 50);
        priceBtn.textContent = "Prices : 50€ +";
        break;

      case "promo":
        result = result.filter(g => Number(g.discount) > 0);
        priceBtn.textContent = "Prices : On Sale";
        break;
    }
  }

  
  if (currentSort) {
    switch(currentSort) {

      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        sortBtn.textContent = "Filter : A → Z";
        break;

      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        sortBtn.textContent = "Filter : Z → A";
        break;

      case "price-low":
        result.sort((a, b) => Number(a.newPrice) - Number(b.newPrice));
        sortBtn.textContent = "Filter : Ascending";
        break;

      case "price-high":
        result.sort((a, b) => Number(b.newPrice) - Number(a.newPrice));
        sortBtn.textContent = "Filter : Descending";
        break;
    }
  }

  displayGames(result);
}




// TOGGLE LEFT DROPDOWN
priceBtn.addEventListener("click", () => {
  priceDropdown.classList.toggle("hidden");
  sortDropdown.classList.add("hidden");
});

// TOGGLE RIGHT DROPDOWN
sortBtn.addEventListener("click", () => {
  sortDropdown.classList.toggle("hidden");
  priceDropdown.classList.add("hidden");
});

// CLOSE DROPDOWNS IF CLICK OUTSIDE
document.addEventListener("click", (e) => {
  if (!e.target.closest("#filter-bar")) {
    priceDropdown.classList.add("hidden");
    sortDropdown.classList.add("hidden");
  }
});