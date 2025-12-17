///////// ------------------    ÉCRAN DE CHARGEMENT    ------------------- //////////
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("hidden"); // masque l'écran après chargement complet
});


function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

const params = new URLSearchParams(window.location.search);
const slugFromUrl = params.get("game");

fetch("games.json")
  .then(res => res.json())
  .then(games => {

    const game = games.find(g =>
      slugify(g.title) === slugFromUrl
    );

    if (!game) {
      document.body.innerHTML = "Jeu introuvable";
      return;
    }

    const bgDiv = document.querySelector('.background-blur');
    bgDiv.style.backgroundImage = `url('${game.image}')`;
    
  });


