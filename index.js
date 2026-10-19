/// const { createElement } = require("react");

///////// ------------------    ÉCRAN DE CHARGEMENT    ------------------- //////////
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("hidden");
});


///////// ------------------    MENU HAMBURGER    ------------------- //////////


const hamb = document.getElementById('hambBtn');
const menu = document.getElementById('mobileMenu');
const panier = document.getElementById('panier-btn');
const panierMenu = document.getElementById('panier-menu');

hamb.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menu.setAttribute('aria-hidden', !open);
});

gsap.set(panierMenu, {
  y: -20,
  opacity: 0,
  display: 'none'
});

panier.addEventListener('click', () => {
  const open = panierMenu.classList.toggle('open');
  panierMenu.inert = !open;
  document.body.classList.toggle('cart-open', open);
  document.body.style.overflow = "hidden";

  if (open) {
    panierMenu.style.display = 'flex';
    panierMenu.style.opacity = '1';
    panierMenu.style.transform = 'translate(-50%, -50%)';
  } 
  
  else {
    panierMenu.style.display = 'none';
    panierMenu.style.opacity = '0';
    document.body.style.overflow = "";
  }
});

document.addEventListener('click', (e) => {
  if (!panier.contains(e.target) && !panierMenu.contains(e.target)) {
    if (panierMenu.classList.contains('open')) {
      panierMenu.classList.remove('open');
      panierMenu.inert = true;
      document.body.classList.remove('cart-open');
      document.body.style.overflow = "";
      panierMenu.style.display = 'none';
      panierMenu.style.opacity = '0';
    }
  }
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
      0
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
const initialGamesCount = 15;
const gamesPerLoad = 15;
let visibleGamesCount = initialGamesCount;
let displayedGames = [];
let showMoreButton = null;

function createCard(game) {
  const slug = slugify(game.title);
  const card = document.createElement("a");
  card.classList.add("game-card");
  card.href = `games.html?game=${slug}`;

  let prices;

  if (Number(game.price) === 0) {
    prices = `<span class="free">Free-To-Play</span>`;
  } 
  
  else if (game.discount && Number(game.discount) > 0) {
    const newPrice = (Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2);
    prices = `
      <span class="badge discount">-${game.discount}%</span>
      <span class="old-price">${game.price}€</span>
      <span class="new-price">${newPrice}€</span>
    `;
  } 
  
  else {
    prices = `${game.price}€`;
  }

/*
    <img src="${game.image}" alt="${game.title}" loading="lazy">
    <p class="price">${prices}</p>
*/
  card.innerHTML = `
   
    <img src="${game.image}" alt="${game.title}" loading="lazy">
    <div class="suggestion-title">${game.title}</div>
    <div class="suggestion-price">${prices}</div>
    <div class="suggestion-tags">${(game.tags || []).slice(0, 5).map(tag => `<span class="suggestion-tag">${tag}</span>`).join('')}</div>
  `;

  if (game.screens && game.screens.length > 0) {
  const imgElement = card.querySelector("img");
  const originalSrc = imgElement.src;
  let currentIndex = 0;
  let running = false;
  let timeoutId = null;
  let fadeTimeoutId = null;

  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });

  const step = async () => {
    if (!running) return;

    const next = (currentIndex + 1) % game.screens.length;

    try {
      await loadImage(game.screens[next]);
    } 
    catch {
      currentIndex = next;
      timeoutId = setTimeout(step, 1200);
      return;
    }

    if (!running) return;

    currentIndex = next;
    imgElement.style.opacity = "0";
    fadeTimeoutId = setTimeout(() => {
      imgElement.src = game.screens[currentIndex];
      imgElement.style.opacity = "1";
      timeoutId = setTimeout(step, 1200);
    }, 250);
  };

  const stopSlideshow = () => {
    running = false;
    clearTimeout(timeoutId);
    clearTimeout(fadeTimeoutId);
    timeoutId = null;
    fadeTimeoutId = null;
    currentIndex = 0;
  };

  card.addEventListener("mouseenter", () => {
    imgElement.style.transition = "transform 0.3s ease, opacity 0.5s ease";
    running = true;
    timeoutId = setTimeout(step, 600);
  });

  card.addEventListener("mouseleave", () => {
    stopSlideshow();
    imgElement.src = originalSrc;
    imgElement.style.opacity = "1";
    imgElement.style.transform = "scale(1)";
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stopSlideshow();
        imgElement.src = originalSrc;
        imgElement.style.opacity = "1";
      }
    });
  });

  observer.observe(card);
}

return card;
}



    ///////// ------------------    MULTIPLAYER SECTION    ------------------- //////////



function createMultiplayerSection(games) {
  const container = document.getElementById('multiplayer-games');
  if (!container) return;

  const multiplayerGames = games
    .filter(game => (game.tags || []).some(tag => tag.toLowerCase() === 'multiplayer'))
    .slice(0, 6);

  if (multiplayerGames.length === 0) {
    container.innerHTML = '';
    return;
  }

  const section = document.createElement('section');
  section.className = 'multiplayerSection';
  container.innerHTML = `<h2 class="Multi-games-title">MULTIPLAYERS GAMES</h2>`
  section.innerHTML = `
    <div class="multiplayerCarousel">
      <button class="carouselButton left">‹</button>
      <div class="multiplayerTrackWrapper">
        <div class="multiplayerTrack"></div>
      </div>
      <button class="carouselButton right">›</button>
    </div>
  `;

  container.appendChild(section);

  const track = section.querySelector('.multiplayerTrack');
  const wrapper = section.querySelector('.multiplayerTrackWrapper');
  const prevBtn = section.querySelector('.left');
  const nextBtn = section.querySelector('.right');

  multiplayerGames.forEach(game => {
    const card = createCard(game);
    card.classList.add('multiplayerCard');
    track.appendChild(card);
  });

  const seeAllCard = document.createElement('a');
seeAllCard.href = 'multiplayer.html';
seeAllCard.classList.add('multiplayerCard', 'seeAllCard');
seeAllCard.innerHTML = `
    <div class="seeAllContent">
      <span class="seeAllArrow">→</span>
      <span>See More</span>
    </div>
`;
track.appendChild(seeAllCard);

  prevBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: -312, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: 312, behavior: 'smooth' });
  });

}




    ///////// ------------------    INDIE SECTION    ------------------- //////////




function createIndieGamesSection(games) {
  const container = document.getElementById("indie-games");
  if (!container) return;

  const indieGames = games
  .filter(game => (game.tags || []).some(tag => tag.toLowerCase() === 'indie'))
  .slice(0, 6);

  if (indieGames.length === 0) {
    container.innerHTML = "";
    return;
  }

  const section = document.createElement('section');
  section.className = 'indieSection';
  container.innerHTML = `<h2 class="indie-games-title">INDIE GAMES</h2>`;
  section.innerHTML = `
    <div class="indieCarousel">
      <button class="carouselButton left">‹</button>
      <div class="indieTrackWrapper">
        <div class="indieTrack"></div>
      </div>
      <button class="carouselButton right">›</button>
    </div>
  `;

  container.appendChild(section);

  const track = section.querySelector(".indieTrack");
  const trackWrapper = section.querySelector(".indieTrackWrapper");
  const nextBtn = section.querySelector(".right");
  const prevBtn = section.querySelector(".left");


  indieGames.forEach(game => {
    const card = createCard(game);
    card.classList.add('indieGamesCard');
    track.appendChild(card);
  });

  const seeAllCard = document.createElement('a');
  seeAllCard.href = 'indieGames.html';
  seeAllCard.classList.add('indieGamesCard', 'seeAllCard');
  seeAllCard.innerHTML = `
    <div class="seeAllContent">
      <span class="seeAllArrow">→</span>
      <span>See More</span>
    </div>
  `;
  track.appendChild(seeAllCard);

  prevBtn.addEventListener('click', () => {
    trackWrapper.scrollBy({ left: -312, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    trackWrapper.scrollBy({ left: 312, behavior: 'smooth' });
  });
}



///////// ------------------    PROMOTIONS HEBDO    ------------------- //////////



const currentWeek = getWeekNumber();

function updateTimer() {
  if (getWeekNumber() !== currentWeek) {
    location.reload();
    return;
  }

  const t = getTimeLeft();
  const timer = document.getElementById("timer");
  if (timer) {
    timer.textContent = `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s`;
  }
}

updateTimer();
setInterval(updateTimer, 1000);



function getWeekNumber() {
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const mondayOffset = 4 * 24 * 60 * 60 * 1000;
  return Math.floor((Date.now() + mondayOffset) / msPerWeek);
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(array, rand) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getTimeLeft() {
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const mondayOffset = 4 * 24 * 60 * 60 * 1000;
  const nextWeekStart = (getWeekNumber() + 1) * msPerWeek - mondayOffset;
  const diff = nextWeekStart - Date.now();

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60
  };
}

function applyWeeklyDiscount(games) {
  const rand = mulberry32(getWeekNumber());

  const pool = games.filter(g => Number(g.price) > 0);
  shuffle(pool, rand);

  pool.slice(0, 4).forEach(g => {
    g.discount = Math.floor(rand() * (95 - 75 + 1)) + 75;
  });

  games.forEach(g => {
    if (!g.discount) g.discount = 0;
  });
}

function previewWeek(games, weekNumber) {
  const rand = mulberry32(weekNumber);

  const pool = games
    .filter(g => Number(g.price) > 0)
    .map(g => ({ ...g }));

  shuffle(pool, rand);

  return pool.slice(0, 4).map(g => ({
    title: g.title,
    discount: Math.floor(rand() * (95 - 75 + 1)) + 75
  }));
}




///////// ------------------    APPELLE DATA DU FICHIER JSON    ------------------- //////////

async function loadGames() {
  try {
    const response = await fetch("games.json");
    const games = await response.json();

    applyWeeklyDiscount(games);
    window.allGames = games;

    const banner = document.getElementById("banner");
    const hotBanner = games.find(game => game.isHot === true || game.isHot === "true");
    

    if (hotBanner) {
      const hotSlug = slugify(hotBanner.title);
      const hotHref = `games.html?game=${hotSlug}`;
      banner.innerHTML = `
        <a href="${hotHref}" class="banner-link">
          <img src="${hotBanner.image}" alt="${hotBanner.title}" class="banner-aura">
          <div class="dispoBtn">NOW AVAILABLE</div>
        </a>
        <div class="particles"></div>
      `;
    }

    const Pcontainer = document.querySelector("#banner .particles");
    if (Pcontainer) {
      const particleCount = 0;
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");
        Pcontainer.appendChild(p);

        const size = Math.random() * 3 + 10;
        const hue = 50 + Math.random() * 30;
        const duration = 2 + Math.random() * 4;
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

    container.innerHTML = "";
    newContainer.innerHTML = "";
    discountContainer.innerHTML = "";


    function createDiscountLayout(games) {
      const discounted = games
        .filter(g => g && g.discount && Number(g.discount) > 0)
        .sort((a, b) => Number(b.discount) - Number(a.discount));

      discountContainer.innerHTML = `
        <p class="deal-timer"><span id="timer"></span></p>
        <h2 class="discount-title">OFFERS OF THE WEEK</h2>
      `;

    if (discounted.length === 0) return;


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

    const [first, second, third, fourth] = discounted.slice(0, 4);

    const layout = document.createElement("div");
    layout.classList.add("discount-layout");

    const firstCard = createCard(first);
    firstCard.classList.add("discount-card");

    const secondCard = createCard(second);
    secondCard.classList.add("discount-card");

    const thirdCard = createCard(third);
    thirdCard.classList.add("discount-card");

    const fourthCard = createCard(fourth);
    fourthCard.classList.add("discount-card");

    layout.appendChild(firstCard);
    layout.appendChild(secondCard);
    layout.appendChild(thirdCard);
    layout.appendChild(fourthCard);

    discountContainer.appendChild(layout);
  }

  const newGamesData = games.filter(game =>
    game.isPopular === true || game.isPopular === "true"
  );

    displayGames(games);

    if (newGamesData.length > 0) initCarousel(newGamesData);
    createDiscountLayout(games);
    createMultiplayerSection(games);
    createIndieGamesSection(games);

    
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
  <h2 class="popular-title">TENDANCES AND POPULARS</h2>
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
  content.querySelectorAll('.carousel-card:not(.leaving)').forEach(old => {
    old.classList.add('leaving');
    old.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.98)' }
      ],
      { duration: 180, easing: 'ease', fill: 'forwards' }
    ).onfinish = () => old.remove();
  });

  const card = createCard(newGamesData[i]);
  card.classList.add('carousel-card');
  content.appendChild(card);

  card.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 280, easing: 'ease' }
  );

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

  showGame(index);
  startAuto();
}
loadGames();



///////// ------------------    SEARCH SUGGESTIONS    ------------------- //////////

const searchInputs = document.querySelectorAll('.search input');

if (searchInputs.length > 0) {

  function createSuggestion(game, input) {
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

    let prices;

    if (Number(game.price) === 0) {
      prices = `<span class="free">Free-To-Play</span>`;
    }

    else if (game.discount && Number(game.discount) > 0) {
      const newPrice = (Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2);
      let badge = `<span class="badge discount">-${game.discount}%</span>`;
      prices = `
      ${badge}
      <span class="old-price">${game.price}€</span>
      <span class="new-price">${newPrice}€</span>
      `;
    }

    else {
      prices = `${game.price}€`;
    }
    
    suggestion.innerHTML = `
      <img src="${game.image}" alt="${game.title}" loading="lazy" style="width: 60px; height: 30px; object-fit: cover; border-radius: 4px;">
      <span>${game.title} : </span>
      <span>${prices}</span>
    `;

    
    
    suggestion.addEventListener('click', () => {
      const slug = slugify(game.title);
      window.open(`games.html?game=${slug}`);
      input.value = game.title;
      const container = input.closest('.search').querySelector('.search-suggestions');
      if (container) container.style.display = "none";
    });

    suggestion.addEventListener('mouseenter', () => {
      suggestion.style.background = "rgba(255,255,255,0.1)";
    });
    suggestion.addEventListener('mouseleave', () => {
      suggestion.style.background = "transparent";
    });

    return suggestion;
  }

  searchInputs.forEach(searchInput => {
    let container = searchInput.closest('.search') && searchInput.closest('.search').querySelector('.search-suggestions');
    if (!container) {
      container = document.createElement('div');
      container.className = 'search-suggestions';
      if (searchInput.closest('.search')) searchInput.closest('.search').appendChild(container);
    }
    container.style.display = 'none';

    searchInput.addEventListener('click', () => {
      if (searchInput.value.trim() === '') {
        container.innerHTML = "";
        
        const topDiscounts = (window.allGames || [])
          .filter(game => game.discount)
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 2);

        const newGames = (window.allGames || [])
          .filter(game => game.isNew === "true")
          .slice(0, 2)


        const hotGames = [...topDiscounts, ...newGames];
        
        if (hotGames.length === 0) {
          container.innerHTML = `<div class="search-suggestion" style="color:#999; padding: 10px;">Aucun jeu populaire</div>`;
          container.style.display = "block";
          return;
        }

        hotGames.forEach(game => {
          container.appendChild(createSuggestion(game, searchInput));
        });

        container.style.display = "block";
      }
    });

    searchInput.addEventListener('input', (event) => {
      const searchText = event.target.value.toLowerCase().trim();
      container.innerHTML = "";

      if (searchText.length === 0) {
        container.style.display = "none";
        return;
      }
      
      const filtered = (window.allGames || [])
        .filter(game => game.title && game.title.toLowerCase().includes(searchText))
        .sort((a, b) => {
          const aLower = a.title.toLowerCase();
          const bLower = b.title.toLowerCase();

          const aStarts = aLower.startsWith(searchText);
          const bStarts = bLower.startsWith(searchText);

          if (aStarts !== bStarts) return aStarts ? -1 : 1;

          const aWord = aLower.split(" ").some(w => w.startsWith(searchText));
          const bWord = bLower.split(" ").some(w => w.startsWith(searchText));

          if (aWord !== bWord) return aWord ? -1 : 1;

          return a.title.localeCompare(b.title);
        })
        .slice(0, 4);

      if (filtered.length === 0) {
        container.innerHTML = `<div class="search-suggestion" style="color:#999; padding: 10px;">No Results</div>`;
        container.style.display = "block";
        return;
      }

      filtered.forEach(game => {
        container.appendChild(createSuggestion(game, searchInput));
      });

      container.style.display = "block";
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search')) {
      document.querySelectorAll('.search-suggestions').forEach(c => c.style.display = 'none');
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
  displayedGames = list;
  visibleGamesCount = initialGamesCount;
  renderVisibleGames();
}

function renderVisibleGames() {
  const cards = container.querySelectorAll(".game-card");

  setTimeout(() => {
    container.innerHTML = "";

    const visibleGames = displayedGames.slice(0, visibleGamesCount);
    preloadScreens(visibleGames);

    visibleGames.forEach(game => {
      const card = createCard(game);
      container.appendChild(card);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.opacity = "1";
        });
      });
    });

    if (!showMoreButton) {
      showMoreButton = document.getElementById("show-more-games") || document.createElement("button");
      showMoreButton.id = "show-more-games";
      showMoreButton.type = "button";
      showMoreButton.textContent = "Show more";
      showMoreButton.addEventListener("click", () => {
        visibleGamesCount += gamesPerLoad;
        renderVisibleGames();
      });
      if (!showMoreButton.isConnected) {
        container.insertAdjacentElement("afterend", showMoreButton);
      }
    }

    const hasMoreGames = visibleGamesCount < displayedGames.length;
    showMoreButton.hidden = !hasMoreGames;
    showMoreButton.style.display = hasMoreGames ? "block" : "none";

  }, 1);
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




priceBtn.addEventListener("click", () => {
  priceDropdown.classList.toggle("hidden");
  sortDropdown.classList.add("hidden");
});

sortBtn.addEventListener("click", () => {
  sortDropdown.classList.toggle("hidden");
  priceDropdown.classList.add("hidden");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("#filter-bar")) {
    priceDropdown.classList.add("hidden");
    sortDropdown.classList.add("hidden");
  }
});