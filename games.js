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
  panierMenu.inert = !open;
  document.body.classList.toggle('cart-open', open);

  if (open) {
    panierMenu.style.display = 'flex';
    panierMenu.style.opacity = '1';
    panierMenu.style.transform = 'translate(-50%, -50%)';
  } 
  
  else {
    panierMenu.style.display = 'none';
    panierMenu.style.opacity = '0';
  }
});

document.addEventListener('click', (e) => {
  if (!panier.contains(e.target) && !panierMenu.contains(e.target)) {
    if (panierMenu.classList.contains('open')) {
      panierMenu.classList.remove('open');
      panierMenu.inert = true;
      document.body.classList.remove('cart-open');
      
      panierMenu.style.display = 'none';
      panierMenu.style.opacity = '0';
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
        
        const topDiscounts = (window.allGames || [])
          .filter(game => game.discount)
          .sort((a, b) => b.discount - a.discount)
          .slice(0, 2);
        const newGames = (window.allGames || [])
          .filter(game => game.isNew === "true")
          .slice(0, 2);
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

function isSameFranchise(titleA, titleB) {
  const a = titleA.toLowerCase().trim();
  const b = titleB.toLowerCase().trim();
  return a.includes(b) || b.includes(a);
}

function isSameEditor(editorA, editorB) {
  if (!editorA || !editorB) return false;
  return editorA.toLowerCase().trim() === editorB.toLowerCase().trim();
}

function getSimilarGames(games, currentGame) {
  const currentTags = (currentGame.tags || []).map(tag => tag.toLowerCase());

  const similarGames = games
    .filter(g => g.title !== currentGame.title)
    .map(g => {
      const tags = (g.tags || []).map(tag => tag.toLowerCase());
      const score = tags.filter(tag => currentTags.includes(tag)).length;
      const sameName = isSameFranchise(g.title, currentGame.title);
      const sameEditor = isSameEditor(g.editor, currentGame.editor);
      return { game: g, score, sameName, sameEditor };
    })
    .filter(item => item.score > 0 || item.sameName || item.sameEditor)
    .sort((a, b) => {
      if (a.sameName !== b.sameName) return a.sameName ? -1 : 1;
      if (b.score !== a.score) return b.score - a.score;
      if (a.sameEditor !== b.sameEditor) return a.sameEditor ? -1 : 1;
      if (a.game.isPopular !== b.game.isPopular) return (b.game.isPopular === "true") ? 1 : -1;
      return a.game.title.localeCompare(b.game.title);
    })
    .map(item => item.game);

  if (similarGames.length === 0) {
    return games
      .filter(g => g.title !== currentGame.title)
      .slice(0, 4);
  }

  return similarGames.slice(0, 5);
}

function createSuggestionCarousel(suggestions) {
  const section = document.createElement('section');
  section.className = 'suggestionsSection';
  section.innerHTML = `
    <div class="suggestionsHeader">
      <h2>Discover Also</h2>
    </div>
    <div class="suggestionsCarousel">
      <button class="carouselButton left" type="button" aria-label="Jeu précédent">‹</button>
      <div class="suggestionsTrackWrapper">
        <div class="suggestionsTrack"></div>
      </div>
      <button class="carouselButton right" type="button" aria-label="Jeu suivant">›</button>
    </div>
  `;

  const track = section.querySelector('.suggestionsTrack');
  const wrapper = section.querySelector('.suggestionsTrackWrapper');
  const prevBtn = section.querySelector('.carouselButton.left');
  const nextBtn = section.querySelector('.carouselButton.right');

  if (suggestions.length === 0) {
    track.innerHTML = `<div class="no-suggestions">Aucune suggestion disponible.</div>`;
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return section;
  }

  suggestions.forEach(game => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'suggestionCard';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <div class="suggestion-title">${game.title}</div>
      <div class="suggestion-price">${Number(game.price) === 0 ? 'Free-To-Play' : game.discount && Number(game.discount) > 0 ? `<span class="badge discount">-${game.discount}%</span> ${(Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2)}€` : `${game.price}€`}</div>
      <div class="suggestion-tags">${(game.tags || []).slice(0, 4).map(tag => `<span class="suggestion-tag">${tag}</span>`).join('')}</div>
    `;

    card.addEventListener('click', () => {
      const slug = slugify(game.title);
      window.open(`games.html?game=${slug}`);
    });

    track.appendChild(card);
  });

  const cards = Array.from(track.children);
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  function getScrollAmount() {
    if (!cards[0]) return 260;
    const cardWidth = cards[0].getBoundingClientRect().width;
    return cardWidth + 16;
  }

  function scrollByAmount(direction) {
    wrapper.scrollBy({
      left: direction * getScrollAmount(),
      behavior: 'smooth'
    });
  }

  function goPrev() {
    scrollByAmount(-1);
  }

  function goNext() {
    scrollByAmount(1);
  }

  wrapper.addEventListener('pointerdown', (event) => {
    isDragging = true;
    wrapper.classList.add('dragging');
    startX = event.pageX - wrapper.offsetLeft;
    startScrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.2;
    wrapper.scrollLeft = startScrollLeft - walk;
  });

  const stopDragging = () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');
  };

  wrapper.addEventListener('pointerup', stopDragging);
  wrapper.addEventListener('pointerleave', stopDragging);
  wrapper.addEventListener('pointercancel', stopDragging);

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);
  return section;
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
  const card = createCardGames(game);
  gameBox.appendChild(card);

  const suggestions = getSimilarGames(games, game);
  const suggestionSection = createSuggestionCarousel(suggestions);
  gameBox.appendChild(suggestionSection);

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

