function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  else {
    return [];
  }
}

// Codes de réduction disponibles
const promoCodes = {
  'WELCOME10': 10,
  'SUMMER20': 20,
  'SAVE15': 15
};

let appliedPromoCode = null;
let promoDiscount = 0;

let cart = loadCart();
displayCart();

window.addEventListener('storage', (e) => {
  if (e.key === 'cart') {
    console.log("Panier mis à jour depuis un autre onglet");
    cart = loadCart();
    displayCart();
  }
});

function applyPromoCode(code) {
  const upperCode = code.toUpperCase().trim();
  
  if (promoCodes[upperCode]) {
    appliedPromoCode = upperCode;
    promoDiscount = promoCodes[upperCode];
    updatePrices();
    
    const applyBtn = document.getElementById('apply-promo-btn');
    const originalText = applyBtn.textContent;
    applyBtn.textContent = 'Code applied! ✓';
    applyBtn.style.background = 'rgba(0, 229, 168, 0.4)';
    
    setTimeout(() => {
      applyBtn.textContent = originalText;
      applyBtn.style.background = '';
    }, 2000);
    
    return true;
  } else {
    alert('Code de réduction invalide');
    return false;
  }
}

function setupPromoCodeHandler() {
  const applyBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('promo-code-input');
  
  if (applyBtn && promoInput) {
    applyBtn.addEventListener('click', () => {
      const code = promoInput.value;
      if (code.trim()) {
        applyPromoCode(code);
        promoInput.value = '';
      }
    });
    
    promoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const code = promoInput.value;
        if (code.trim()) {
          applyPromoCode(code);
          promoInput.value = '';
        }
      }
    });
  }
}


function addToCart(title, price, discount, image) {
  const game = cart.find(game => game.title === title);
  if (game) {
    alert("Ce jeu est déja dans le panier");
  }
  else {
    cart.push({title, price, discount, image});
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Produit ajouter dans le panier !");
    displayCart();
  }
}

function removeFromCart(title) {
  cart = cart.filter(game => game.title !== title);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}


function displayCart() {
  const itemsContainer = document.getElementById('panier-items-container');
  const panierEmpty = document.getElementById('panier-empty');
  const panierItem = document.getElementById('panier-item');

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '';
    panierEmpty.style.display = 'flex';
    panierItem.style.display = "none";
    updatePrices();
    return;
  }

  panierEmpty.style.display = 'none';
  panierItem.textContent = `${cart.length}`;
  panierItem.style.display = "block";

  itemsContainer.innerHTML = '';

  cart.forEach((game, index) => {
    let prices;
    let priceValue = 0;

    if (game.discount && Number(game.discount) > 0) {
      const newPrice = (Number(game.price) * (1 - Number(game.discount) / 100)).toFixed(2);
      priceValue = Number(newPrice);
      prices = `
        <div class="cart-games-price">
          <span class="old-price">${Number(game.price).toFixed(2)}€</span>
          <span class="new-price">${newPrice}€</span>
          <span class="badge discount">-${game.discount}%</span>
        </div>
      `;
    } else if (Number(game.price) === 0) {
      priceValue = 0;
      prices = `<div class="cart-games-price"><span class="free">Gratuit</span></div>`;
    } else {
      priceValue = Number(game.price);
      prices = `<div class="cart-games-price"><span>${Number(game.price).toFixed(2)}€</span></div>`;
    }

    const gameElement = document.createElement('div');
    gameElement.className = 'cart-games';
    gameElement.innerHTML = `
      <i class="fa-solid fa-square-xmark remove-game-btn" data-index="${index}"></i>
      <img src="${game.image}" alt="${game.title}">
      <div class="cart-games-info">
        <div class="cart-games-title">${game.title}</div>
        ${prices}
      </div>
    `;

    itemsContainer.appendChild(gameElement);
  });

  // Ajouter event listeners pour les boutons de suppression
  document.querySelectorAll('.remove-game-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = btn.getAttribute('data-index');
      removeFromCart(cart[index].title);
    });
  });

  setupPromoCodeHandler();
  updatePrices();
}

function updatePrices() {
  const priceBeforeEl = document.getElementById('price-before');
  const gameDiscountRowEl = document.getElementById('game-discount-row');
  const gameDiscountEl = document.getElementById('game-discount-amount');
  const promoDiscountRowEl = document.getElementById('promo-discount-row');
  const promoDiscountEl = document.getElementById('promo-discount-amount');
  const totalEl = document.getElementById('total');

  let priceBefore = 0;
  let gameDiscount = 0;

  cart.forEach(game => {
    const price = Number(game.price) || 0;
    priceBefore += price;

    if (game.discount && Number(game.discount) > 0) {
      const discountAmount = price * (Number(game.discount) / 100);
      gameDiscount += discountAmount;
    }
  });

  const afterGameDiscount = priceBefore - gameDiscount;
  const total = afterGameDiscount - promoDiscount;

  // Afficher le prix avant réductions
  priceBeforeEl.textContent = priceBefore.toFixed(2) + '€';
  
  // Afficher les réductions de jeux si applicable
  if (gameDiscount > 0) {
    gameDiscountRowEl.style.display = 'flex';
    gameDiscountEl.textContent = '-' + gameDiscount.toFixed(2) + '€';
  } else {
    gameDiscountRowEl.style.display = 'none';
  }

  // Afficher les réductions de code promo si applicable
  if (promoDiscount > 0) {
    promoDiscountRowEl.style.display = 'flex';
    promoDiscountEl.textContent = '-' + promoDiscount.toFixed(2) + '€';
  } else {
    promoDiscountRowEl.style.display = 'none';
  }

  // Afficher le total
  totalEl.textContent = Math.max(0, total).toFixed(2) + '€';
}

function setupCartCloseButton() {
  const closeBtn = document.querySelector('.close-panier');
  const panierBtn = document.getElementById('panier-btn');
  
  if (closeBtn && panierBtn) {
    closeBtn.addEventListener('click', () => {
      panierBtn.click();
    });
  }
}

document.addEventListener('DOMContentLoaded', setupCartCloseButton);

console.log('Codes de réduction disponibles pour tester: WELCOME10 (10€), SUMMER20 (20€), SAVE15 (15€)');
