function loadCarte() {
    const savedCarte = localStorage.getItem('carte');
    if (savedCarte) {
        return JSON.parse(savedCarte);
    }
    else {
        return [];
    }
}

let cart = loadCarte();

function addToCart(title, price, discount, image) {
    const game = cart.find(game => game.title === title);
    if (game) {
        console.log("Ce jeu est déja dans le panier");
    }
    else {
        cart.push({title, price, discount, image});
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Produit ajouter dans le panier !");
    }
}

const buyBtn = document.getElementById('buy-btn');

buyBtn.addEventListener('click', () => {
    console.log("Ajouter au panier !");
});

document.addEventListener('keydown', () => {
    console.log("caca");
});