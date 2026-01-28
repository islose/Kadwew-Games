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

function addToCart(title, price, discount, image) {
  const game = cart.find(game => game.title === title);
  if (game) {
    console.log("Ce jeu est déja dans le panier");
  }
  else {
    cart.push({title, price, discount, image});
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Produit ajouter dans le panier !");
    displayCart();
  }
}


function displayCart() {
  const panierMenu = document.getElementById('panier-menu');
  if (panierMenu) {
    panierMenu.innerHTML = `
    <div class="panierH2">
      <h2>Votre Panier</h2>
    </div>
    <div class="cart-list"></div>
    `;

    const cartList = panierMenu.querySelector('.cart-list');

    cart.forEach(game => {
      cartList.innerHTML += `
      <div class="cart-games">
        <img src="${game.image}">
        <p>${game.title}</p>
        <p>${game.discount}%</p>
        <p>${game.price}€</p>
      </div>`
    });
  }
}