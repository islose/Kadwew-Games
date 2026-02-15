function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  else {
    return [];
  }
}

let cart = loadCart();
displayCart();

window.addEventListener('storage', (e) => {
  if (e.key === 'cart') {
    console.log("Pannier mis a jours depuis un autre onglet !!!!!!!");
    cart = loadCart();
    displayCart();
  }
});


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
  const cartGames = document.getElementById('cart-games');

  cart = cart.filter(game => game.title !== title);
  if (panierMenu) {
    cartGames.innerHTML = ``;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}


function displayCart() {
  const panierMenu = document.getElementById('panier-menu');
  const panierItem = document.getElementById('panier-item');

  if (panierMenu) {
    panierMenu.innerHTML = `
    <div class="panierH2">
      <h2>Votre Panier</h2>
    </div>
    <div class="cart-list"></div>
    `;

    const cartList = panierMenu.querySelector('.cart-list');

    if (cart.length === 0) {
      panierItem.style.display = "none";
      return;
    }

    panierItem.textContent = `${cart.length}`;
    panierItem.style.display = "block";

    cart.forEach(game => {
      cartList.innerHTML += `
      <div class="cart-games" id="cart-games">
        <i class="fa-solid fa-square-xmark remove-game-btn"></i>
        <img src="${game.image}">
        <p>${game.title}</p>
        <p>${game.discount}%</p>
        <p>${game.price}€</p>
      </div>`
    });

    const removeButtons = document.querySelectorAll('.remove-game-btn');
    
    removeButtons.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromCart(cart[index].title);
      });
    });
  }
}
