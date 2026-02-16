let game;

///////// ------------------    LOAD GAMES DATA    ------------------- //////////
fetch('games.json')
  .then(response => response.json())
  .then(games => {
    window.allGames = games;
  })
  .catch(error => console.error("Error loading games.json:", error));

///////// ------------------    ÉCRAN DE CHARGEMENT    ------------------- //////////
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('hidden');
});


const hamb = document.getElementById('hambBtn');
const mobileMenu = document.getElementById('mobileMenu');
const panier = document.getElementById('panier-btn');
const panierMenu = document.getElementById('panier-menu');

hamb.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle('open');
  mobileMenu.setAttribute('aria-hidden', !open);
});

gsap.set(panierMenu, {
  y: -20,
  opacity: 0,
  display: 'none'
});

panier.addEventListener('click', () => {
  const open = panierMenu.classList.toggle('open');
  panierMenu.setAttribute('aria-hidden', !open);
  document.body.classList.toggle('cart-open', open);

  if (open) {
    gsap.timeline()
      .set(panierMenu, { display: 'block' })
      .to(panierMenu, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
  } 
  
  else {
    gsap.to(panierMenu, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        gsap.set(panierMenu, { display: 'none' });
      }
    });
  }
});

document.addEventListener('click', (e) => {
  if (!panier.contains(e.target) && !panierMenu.contains(e.target)) {
    if (panierMenu.classList.contains('open')) {
      panierMenu.classList.remove('open');
      panierMenu.setAttribute('aria-hidden', true);
      document.body.classList.remove('cart-open');
      
      gsap.to(panierMenu, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(panierMenu, { display: 'none' });
        }
      });
    }
  }
});






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
      <img src="${game.image}" alt="${game.title}" style="width: 60px; height: 30px; object-fit: cover; border-radius: 4px;">
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
        
        const hotGames = (window.allGames || [])
          .filter(game => game.isHot)
          .slice(0, 4);

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
  } else if (game.discount && Number(game.discount) > 0) {
    const newPrice = (Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2);
    prices = `
      <span class="old-price">${game.price}€</span>
      <span class="new-price">${newPrice}€</span>
    `;
  } else {
    prices = `${game.price}€`;
  }

  card.innerHTML = `
    <h2 class="game-title">${game.title}</h2>
    <img class="main-image" src="${game.image}" alt="${game.title}">
    <div class="price" id="price">
      ${game.discount && Number(game.discount) > 0 ? `
        <span class="badge discount">-${game.discount}%</span>
      ` : ''}
      ${prices}
    </div>
    <div class="game-information" id="game-information">
        <button class="buy-btn" id="buy-btn">Purchase</button>
        <button class="add-cart-btn" id="add-cart-btn"><i class="fa-solid fa-cart-plus"></i> Add to cart</button>
    </div>
    <div class="description" id="description">${game.description}</div>
    
    ${game.screens && game.screens.length > 0 ? `
      <div class="screens">
        <div class="screensH1">
          <h1>Screenshots</h1>
        </div>
        ${screensHTML}
      </div>
    ` : ''}
    
    ${game.requirements ? `
      <div class="systemRequirements" id="systemRequirements">
        <h2>System Requirements</h2>
        <div class="requirementsContainer">
          ${game.requirements.minimum ? `
            <div class="systemMinimum">
              <h3>Minimum</h3>
              <ul>
                <li><strong>OS:</strong> ${game.requirements.minimum.os}</li>
                <li><strong>CPU:</strong> ${game.requirements.minimum.cpu}</li>
                <li><strong>RAM:</strong> ${game.requirements.minimum.ram}</li>
                <li><strong>GPU:</strong> ${game.requirements.minimum.gpu}</li>
                <li><strong>Storage:</strong> ${game.requirements.minimum.storage}</li>
              </ul>
            </div>
          ` : ''}
          
          ${game.requirements.recommended ? `
            <div class="systemRecomended ${!game.requirements.minimum ? 'centered' : ''}">
              <h3>Recommended</h3>
              <ul>
                <li><strong>OS:</strong> ${game.requirements.recommended.os}</li>
                <li><strong>CPU:</strong> ${game.requirements.recommended.cpu}</li>
                <li><strong>RAM:</strong> ${game.requirements.recommended.ram}</li>
                <li><strong>GPU:</strong> ${game.requirements.recommended.gpu}</li>
                <li><strong>Storage:</strong> ${game.requirements.recommended.storage}</li>
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    ` : `
      <div class="systemRequirements">
        <div class="requirementsContainer">
          <div class="systemMinimum">
            <h3>Minimum</h3>
              <ul>
                <li><strong>OS:</strong> TBD</li>
                <li><strong>CPU:</strong> TBD</li>
                <li><strong>RAM:</strong> TBD</li>
                <li><strong>GPU:</strong> TBD</li>
                <li><strong>Storage:</strong> TBD</li>
              </ul>
          </div>
        
          <div class="systemRecomended">
            <h3>Recommended</h3>
              <ul>
                <li><strong>OS:</strong> TBD</li>
                <li><strong>CPU:</strong> TBD</li>
                <li><strong>RAM:</strong> TBD</li>
                <li><strong>GPU:</strong> TBD</li>
                <li><strong>Storage:</strong> TBD</li>
              </ul>
          </div>
        </div>
      </div>
    </div>
    `}
  `;

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

  const buyBtn = document.getElementById('add-cart-btn');
  const removeGameBtn = document.getElementById('remove-game-btn');

  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      addToCart(game.title, game.price, game.discount, game.image);
    });
  }

  if (removeGameBtn) {
    removeGameBtn.addEventListener('click', () => {
      removeFromCart(title);
    });
  }
}

loadGame();

