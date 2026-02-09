/*
const delay = 5000; // 5s
let index = 0;
let timeoutId = null;

const inner = document.getElementById("carousel-inner");
const slides = document.querySelectorAll(".slide");
const progressBar = document.querySelector(".progress-bar");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const carousel = document.getElementById("carousel");

let elapsed = 0; // temps écoulé dans le cycle courant
let startTime = 0;

function showSlide(i) {
  index = (i + slides.length) % slides.length;
  inner.style.transform = `translateX(-${index * 100}%)`;

  // reset progress
  progressBar.style.transition = "none";
  progressBar.style.width = "0%";
  
  // repart pour un cycle complet
  requestAnimationFrame(() => {
    progressBar.style.transition = `width ${delay}ms linear`;
    progressBar.style.width = "100%";
  });

  startTime = Date.now();
  elapsed = 0;
}

function startAuto() {
  stopAuto();

  const remaining = Math.max(delay - elapsed, 50); // temps restant
  progressBar.style.transition = "none";
  progressBar.style.width = (elapsed / delay) * 100 + "%";

  requestAnimationFrame(() => {
    progressBar.style.transition = `width ${remaining}ms linear`;
    progressBar.style.width = "100%";
  });

  timeoutId = setTimeout(function tick() {
    showSlide(index + 1);
    startAuto();
  }, remaining);

  startTime = Date.now() - elapsed;
}

function stopAuto() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  // calcule le temps déjà passé
  elapsed = Date.now() - startTime;
  if (elapsed < 0) elapsed = 0;
  if (elapsed > delay) elapsed = delay;

  // fige la barre au bon pourcentage
  const percent = (elapsed / delay) * 100;
  progressBar.style.transition = "none";
  progressBar.style.width = percent + "%";
}


// boutons
nextBtn.addEventListener("click", () => {
  showSlide(index + 1);
  startAuto();
});

prevBtn.addEventListener("click", () => {
  showSlide(index - 1);
  startAuto();
});

// pause/reprise
carousel.addEventListener("mouseenter", stopAuto);
carousel.addEventListener("mouseleave", startAuto);

// init
showSlide(index);
startAuto();
*/

const images = ["image1", "image2", "image3"];
let index = 0;

for (let i = 0; i < 6; i++) {  
  console.log("Image suivante :", images[index]);
  index = (index + 1) % images.length;
  
}


for (let i = 0; i < 6; i++) {
  console.log("Image précédente :", images[index]);
  index = (index - 1 + images.length) % images.length;
  
}

const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

function jourDansXJours(départ, nbJours) {
  const nouveauIndex = (départ + nbJours) % jours.length;
  const resultat = jours[nouveauIndex]
  return resultat;
}

console.log(jourDansXJours(0, 3));
console.log(jourDansXJours(4, 10));
console.log(jourDansXJours(6, 1));
console.log(jourDansXJours(3, 2));

const days = ["monday", "tuesday", "wednsday", "thursday", "friday", "saturday", "sunday"];

function dayInXday (start, daysNum) {
  const newIndex = (start + daysNum) % days.length;
  const result = days[newIndex];
  return result;
}

console.log(dayInXday(0, 3));
console.log(dayInXday(3, 9));
console.log(dayInXday(7, 2));
console.log(dayInXday(4, 4));


function isAnagram (s, t) {
  if (s.length !== t.length) return false;

  let sWord = s.split("").sort().join("");
  let tWord = t.split("").sort().join("");

  return (sWord === tWord);
}

console.log(isAnagram("caca", "acac"));
console.log(isAnagram("chat", "chien"));
console.log(isAnagram("cat", "tac"));

function countLetter (word) {
  let count = {};

  for (let letter of word) {
    letter = letter.toLowerCase();
    count[letter] = (count[letter] || 0) + 1;
    console.log(`${letter}: ${count[letter]}`);
  }
  return word;
}

console.log(countLetter("Hello"));
console.log(countLetter("kadWew"));

function reverseString (str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  reversed = reversed[0].toUpperCase() + reversed.slice(1);
  return reversed;
}

console.log(reverseString("hello"));
console.log(reverseString("kadwew"));
console.log(reverseString("123456"));
/*
document.addEventListener("DOMContentLoaded", () => {
  const Pcontainer = document.querySelector(".particles");
  if (!Pcontainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    Pcontainer.appendChild(p);

    // Taille, couleur, durée aléatoires
    const size = Math.random() * 3 + 10; // 2 à 5 px
    const hue = 20 + Math.random() * 30; // nuances orange/jaune (HSL)
    const duration = 4 + Math.random() * 4; // 8 à 16 secondes

    // Applique le style de la particule
    gsap.set(p, {
      width: size,
      height: size,
      backgroundColor: `hsl(${hue}, 90%, 70%)`,
      boxShadow: `0 0 ${size * 3}px hsl(${hue}, 100%, 65%)`,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 100,
      opacity: Math.random() * 0.8 + 0.2,
      scale: size / 5,
    });

    // Animation principale (monte)
    gsap.to(p, {
      y: -100,
      opacity: 0,
      duration,
      ease: "none",
      repeat: -1,
      delay: Math.random() * duration,
    });

    // Animation de flottement gauche/droite
    gsap.to(p, {
      x: `+=${Math.random() * 100 - 50}`, // -50 à +50 px
      duration: Math.random() * 4 + 3, // oscillation 3 à 7s
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
});
*/

function isPalindrom(word) {

  let reversedWord = word.split("").reverse().join("");

  if (word === reversedWord) {
    return true;
  }
  else {
    return false;
  }
}

console.log(isPalindrom("caca"));
console.log(isPalindrom("gog"));
console.log(isPalindrom("letter"));
console.log(isPalindrom("verev"));
console.log(isPalindrom("test"));

function letterCounter (word) {
  let count = {};

  for (let letter of word) {
    if(letter === " ") continue;
    count[letter] = (count[letter] || 0) + 1;
    
  }
  return count;
}

console.log(letterCounter("caca au sucre"));
console.log(letterCounter("caca"));
console.log(letterCounter("au"));
console.log(letterCounter("sucre"));

function findMax (n) {
  let max = n[0];

  for (let i = 0; i < n.length; i++) {
    if (n[i] > max) {
      max = n[i];
    }
  }
  return max;
}

console.log(findMax([7, 1, 2, 10, 3, 4, 5, 6]));
console.log(findMax([-5, -1, -50, -100]));

function findMin (n) {
  let min = n[0];

  for (let i = 0; i < n.length; i++){
    if (n[i] < min) {
      min = n[i];
    }
  }
  return min;
}

console.log(findMin([7, 1, 2, 3, 4, 5, 6]));
console.log(findMin([-5, -1, -50, -100]));

function findDuplicates (arr) {
  let count = {};
  let duplicata = []; 
  for (let number of arr) {
    count[number] = (count[number] || 0) + 1;
  }

  for (let number in count) {
    if(count[number] > 1) {
      duplicata.push(+number);
    }
  }
  return duplicata;
}

console.log(findDuplicates([1, 2, 3, 4, 4, 5, 6, 1]));
console.log(findDuplicates([5, 55, 555, 5, -5, -555, 0, -55, 5]));

console.log("=== Jeu du || (ou bien) ===");

// Cas 1 : première valeur existe
let a = 5;
let b = 10;
console.log("a =", a, "b =", b, "→", a || b);
// Résultat : 5 (parce que a existe, donc on garde a)

// Cas 2 : première valeur vaut 0
a = 0;
b = 10;
console.log("a =", a, "b =", b, "→", a || b);
// Résultat : 10 (car 0 est considéré comme “faux”)

// Cas 3 : première valeur est undefined
a = undefined;
b = 42;
console.log("a =", a, "b =", b, "→", a || b);
// Résultat : 42 (car a n’existe pas, donc on prend b)

// Cas 4 : première valeur est vide ("")
a = "";
b = "Texte de secours";
console.log("a =", a, "b =", b, "→", a || b);
// Résultat : "Texte de secours"

// Cas 5 : première valeur est vraie
a = "Bonjour";
b = "Salut";
console.log("a =", a, "b =", b, "→", a || b);
// Résultat : "Bonjour" (car la première valeur existe)


function mostFrequentChar (word) {
  let count = {};
  let mostChar = "";
  let max = 0;

  for (let letter of word) {
    count[letter] = (count[letter] || 0) + 1;  
  }

  for (let letter in count) {
    if (count[letter] > max) {
      max = count[letter];
      mostChar = letter;
    }
  }

  if (max === 1) {
    return (`Dans le mot "${word.toUpperCase()}" aucune lettre ne se répete`);
  }
  else {
    return (`Dans le mot "${word.toUpperCase()}" la lettre ${mostChar}, est répéter ${max} fois.`);
  }
}

console.log(mostFrequentChar("kadwew"));
console.log(mostFrequentChar("negolo"));
console.log(mostFrequentChar("farouk"));
console.log(mostFrequentChar("chat"));

console.log("////////////////////////////////////////////")

/*
function newMostFrequentChar(word) {
  const count = [...word].reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});

  const [mostChar, max] = Object.entries(count)
    .reduce((a, b) => (b[1] > a[1] ? b : a));

  return max === 1
  ? `Dans le mot "${word.toUpperCase()}", toutes les lettres sont répétées une seul fois.`
  : `La lettre la plus répétée dans "${word.toUpperCase()}" est : ${mostChar}, ${max} fois.`
}
*/
function newMostFrequentChar (word) {
  const count = [...word].reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});

  const max = Math.max(...Object.values(count));

  const mostChar = Object.entries(count)
  .filter(([_, value]) => value === max)
  .map(([letter]) => letter);

  if (max === 1) {
    return `Dans le mot "${word.toUpperCase()}", toutes les lettres sont répétées une seul fois."`
  }
  else if (mostChar.length > 1) {
    return `Dans "${word.toUpperCase()}", les lettres les plus répétées sont : ${mostChar.join(", ")} (${max} fois chacune).`;
  } 
  else {
    return `La lettre la plus répétée dans "${word.toUpperCase()}" est : "${mostChar}" ${max} fois.`
  } 
}

console.log(newMostFrequentChar("bonjourCommentTalaVous"));
console.log(newMostFrequentChar("javascript"));
console.log(newMostFrequentChar("test"));
console.log(newMostFrequentChar("google"));
console.log(newMostFrequentChar("sel"));

function countVowels (str) {
  const vowels = "aiueoyAIUEOY";
  let counter = 0;

  for (let char of str) {
    if (vowels.includes(char)) {
      counter++;
    }
  }
  return counter;
}

console.log(countVowels("Bonjour tout le monde"));
console.log(countVowels("aiueo"));
console.log(countVowels("Mon nom est Voyelle"));

const player = { name: "Kadwew", score: 10, level: 1};

function addScore (p, points) {
  p.score += points;
}

addScore(player, 5);
console.log(player.score);

const nums = [2, 5, 8, 13, 21, 36];
let pair = [];
function onlyPair (nums) {
  for (const n of nums) {
    if (n % 2 === 0) {
      pair.push(n);
    }
  }
  return pair;
}

console.log(onlyPair(nums));


const names = ["Kadwew", "Islos", "PapouasieNouvelleGuinée"];

function countLetterOfNames (names) {
  return names.map(name => name.length);
}

console.log(countLetterOfNames(names));


const verif = document.getElementById("verif");
const texto = document.getElementById("texto");
const result = document.getElementById("result");

verif.addEventListener("click", () => {
  const age = Number(texto.value);

  if (!age) {
    result.textContent = "Veuillez entrer un age valide !";
    return;
  }

  else if (age < 18 && age > 0) {
    result.textContent = "Vous êtes Mineur !";
  }

  else if (age > 105) {
    result.textContent = "Vous êtes normalment mort la";
  }

  else if (age < 1) {
    result.textContent = "C'est juste impossible";
  }

  else {
    result.textContent = "Vous êtes Majeur !";
  }
});

const fruits = ["pomme", "banane"];

const newFruits = [...fruits, "orange"];

console.log(newFruits);
console.log(fruits);

const user = { nom: "Islos", age: 25};

const addInfoUser = {...user, ville: "Alger"};

console.log(addInfoUser);
console.log(user);

function test() {
  console.log("Salut");
}

const x = test();
console.log(x);

/*
function windowSum(arr) {
  let maxSum = -Infinity;

  for (let i = 0; i < arr.length - 3; i++) {
    const currentWindow = [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]];
    const currentSum = arr[i] + arr[i + 1] + arr[i + 2] + arr[i + 3];
    console.log("Fenêtre :", currentWindow, "-> Somme :", currentSum);

    if (currentSum > maxSum) {
      maxSum = currentSum
    }
  }

  

  return (`La Somme de la fenêtre la plus grande est : ${maxSum}`);
}

console.log(windowSum([1, 9, 2, 5, 4, 3, 4, 8, 7, 9, 1, 6]));
*/

function optiWindowSum(arr) {
  let minSum = Infinity;

  let currentSum = arr[0] + arr[1] + arr[2];
  minSum = currentSum;

  console.log("Fenêtre :", [arr[0], arr[1], arr[2]], "-> Somme : ", currentSum);

  for (let i = 1; i < arr.length - 2; i++) {
    currentSum = currentSum - arr[i - 1] + arr[i + 2];

    let currentWindow = [arr[i], arr[i + 1], arr[i + 2]];
    console.log("Fenêtre :", currentWindow, "-> Somme : ", currentSum);

    if (currentSum < minSum) {
      minSum = currentSum;
    }
  }
  
  return (`La Somme de la fenêtre la plus petite est : ${minSum}`);
}

console.log(optiWindowSum([6, 5, 1, 7, 2, 1, 3, 4, 9, 8, 9, 1, 4]));


function windowSums(arr, k) {
  let left = 0;
  let currentSum = 0;
  let maxLen = 0;

  for (let right = 0; right < arr.length; right++) {
    currentSum += arr[right];

    while (currentSum > k) {
      currentSum -= arr[left];
      left++
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

console.log(windowSums([5, 2, 4, 1, 3, 1], 5));


function mapping (word) {
  let map = {};

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];

    if (!map[letter]) {
      map[letter] = 1;
    }

    else {
      map[letter]++;
    }

  }
  return map;
}

console.log(mapping("banana"));


function hasDuplicated(str) {
  let map = {};
  for (let i = 0; i < str.length; i++) {
    let letter = str[i];

    if (map[letter]) {
      return "Rep";
    }
    else {
      map[letter] = true;
    }
  }
  return "Pas De Rep";
}

console.log(hasDuplicated("hello"));
console.log(hasDuplicated("salim"));
console.log(hasDuplicated("abcdefghijklmnopqrstuvwxyz"));
console.log(hasDuplicated("azertyuioppa"));
console.log(hasDuplicated("malik"));
console.log(hasDuplicated("kadwew"));


const input = document.getElementById("search");
const results = document.getElementById("result");
const words = [
  "Grand Theft Auto 1",
  "Grand Theft Auto 2",
  "Grand Theft Auto 3",
  "Grand Theft Auto 4",
  "Grand Theft Auto 5",
  "Grand Theft Auto San Andreas",
  "Call of Duty Modern Warfare",
  "call of duty black ops 1",
  "call of duty black ops 2",
  "the last of us",
  "league of legends"
];

/*
const words = ["pomme", "fraise", "ananas", "mangue", "poire"];

input.addEventListener("input", function(event){
  console.log(event.target.value);
});
*/



input.addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase("");

  const filtered = words.filter(word => {
    const initials = getInitial(word);
    const lower = word.toLowerCase();

    if (searchText === "") {
      result.innerHTML = "";
      return;
    }

    return (lower.includes(searchText) || initials.includes(searchText));
  });
  result.innerHTML = filtered.join("<br>");
});



input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("Tu as validé avec Entrée :", input.value);
  }
});


const arrowFunction = (a, b) => {
  return a + b;
}
console.log(arrowFunction(1, 5));

const carréFunction = (a) => {
  return a * a;
}
console.log(carréFunction(5));

const nameFunction = (str) => {
  return (`Bonjour ${str} !`);
}
console.log(nameFunction("Kadwew"));

const pairImpair = (a) => a % 2 === 0 ? "pair" : "impair";
console.log(pairImpair(25));
console.log(pairImpair(1));
console.log(pairImpair(4));

const ageFunction = (age) => age >= 18;
console.log(ageFunction(18));
console.log(ageFunction(150));
console.log(ageFunction(14));

const doubleTable = (numbers) => {
  return numbers.map(number => number * 2);
}

console.log(doubleTable([1, 2, 3, 4, 5]));

const moreThan20 = (numbers) => {
  return numbers.filter(number => number >= 20);
}

console.log(moreThan20([10, 15, 20, 25, 30]));

const findWord = (words) => {
  return words.find(word => word.includes("react"));
}
console.log(findWord(["js", "html", "css", "react"]));

const findFirstEven = numbers => numbers.find(number => number % 2 === 0);

console.log(findFirstEven([1, 3, 5, 8, 10]));

const sum = (a, b) => a + b;
console.log(sum(1, 2));

const isPositive = (n) => n > 0;
console.log(isPositive(5));
console.log(isPositive(0));
console.log(isPositive(-5));

const toUpper = (str) => str.toUpperCase();
console.log(toUpper("react"));


const doublePrices = (prices) => prices.map(price => price * 2);
console.log(doublePrices([10, 15 ,20]));

const getAdults = (ages) => ages.filter(age => age >= 18);
console.log(getAdults([15, 20, 17, 30]));


const users = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" },
  { id: 3, name: "Yassine" }
];

const findUser = (users) =>  users.find(user => user.id === 2);
console.log(findUser(users));

const prices = [50, 120, 80];

const formatPrices = (prices) =>
   prices.map(price =>
     price >= 100
      ? `${price} DA`
      : `Promo : ${price} DA`
      );

console.log(formatPrices(prices));

const utilisateurs = [
  { name: "Ali", active: true },
  { name: "Sara", active: false },
  { name: "Yassine", active: true }
];

const getActiveUsers = (utilisateurs) =>
   utilisateurs.filter(utilisateur =>
     utilisateur.active);

console.log(getActiveUsers(utilisateurs));

const getUserNames = (utilisateurs) =>
   utilisateurs.map(utilisateur =>
    utilisateur.name
   );
console.log(getUserNames(utilisateurs));

const findExpensive = (prices) =>
  prices.find(price => price >= 100);

console.log(findExpensive(prices));

const sumPrices = (prices) => prices.reduce((a, b) => b + a, 0);
console.log(sumPrices(prices));


function slugify (text) {
  return text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

console.log(slugify("La loi de la nature: le monde perdue"));

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  console.log("Boutton cliquer !");
});

const btnC = document.getElementById("btnC");
const pb = document.getElementById("pb");

btnC.addEventListener("click", () => {
  pb.textContent = "Bonsoir";
});

const box = document.getElementById("box");
const Bouton = document.getElementById("Bouton");

Bouton.addEventListener("click", () => {
  box.classList.toggle("active");
});

const inputs = document.getElementById("input");
const resultss = document.getElementById("result");
/* 
inputs.addEventListener("keydown", (event) => {
    if (event.target.value.length >= 4 && !["Backspace", "ArrowLeft", "ArrowRight", "Shift", "Control"].includes(event.key)) {
      event.preventDefault();
    }
  });

inputs.addEventListener("input", (event) => {
  resultss.textContent = `Caractères : ${event.target.value.length}`;
  if (event.target.value.length >= 4) {
    resultss.textContent = "Nombre maximal de caractères atteint";
  }
});
*/
const spec = /[^a-zA-Z\s]/;

inputs.addEventListener("keydown", (event) => {
  if (spec.test(event.key)) {
    event.preventDefault();
    resultss.textContent = "Veuillez évitez les chiffres et carachteres spéciaux";
  }
    console.log(event.key);
});

inputs.addEventListener("input", (event) => {
  if (!spec.test(event.key)) {
    resultss.textContent = "Caracther dissponibel";
  }
});


/*
function getInitial(str) {
  return str
  .split(" ")
  .map(word => word[0])
  .join("")
  .toLowerCase();
}

input.addEventListener("input", function(event){
  const searchText = event.target.value.toLowerCase();

  const filtered = words.filter(word => {
    const initials = getInitial(word);
    const lower = word.toLowerCase();

    if (searchText === ""){
      result.innerHTML = "";
      return;
    }

    return (
      lower.includes(searchText) ||
      initials.includes(searchText)
    );
  });

  result.innerHTML = filtered.join("<br>");
});
*/
const jeux = [
  "Grand Theft Auto 1",
  "Grand Theft Auto 2",
  "Grand Theft Auto 3",
  "Grand Theft Auto 4",
  "Grand Theft Auto 5",
  "Grand Theft Auto San Andreas",
  "Call of Duty Modern Warfare",
  "Call of duty black ops 1",
  "Call of duty black ops 2",
  "The last of us",
  "League of legends",
  "Battlefield 2042",
  "Battlefield 6",
  "Mortal kombat",
  "Player unknown battleground",
  "Legend of runeterra",
  "Nostale",
  "World of warcraft",
  "Overwatch",
  "Battlerite",
  "Realm royal",
  "Fortnite",
  "Plants vs zombies",
  "Saints row",
  "Uncharted 1",
  "Uncharted 2",
  "Uncharted 3",
  "Uncharted 4",
  "Paladin",
  "Smite"
];
function getInitial (str) {
  return str.split(" ").map(jeu => jeu[0]).join("").toLowerCase();
}
/*
inputs.addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase();

  if (searchText === "") {
    result.innerHTML = "";
    return;
  }

  const filtered = jeux
    .filter(jeu => {
      const initial = getInitial(jeu);
      const lower = jeu.toLowerCase();

      return (lower.includes(searchText) || initial.includes(searchText));
    
  })
  .sort((a, b) => a.localeCompare(b));  
  result.innerHTML = filtered.join("<br>");
});
*/

inputs.addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase();

  if (searchText === "") {
    result.innerHTML = "";
    return;
  }

  const filtered = jeux
    .filter(jeu => jeu.toLowerCase().includes(searchText))
    .sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      // priorité 1 : commence par la lettre
      const aStarts = aLower.startsWith(searchText);
      const bStarts = bLower.startsWith(searchText);

      if (aStarts !== bStarts) return aStarts ? -1 : 1;

      // priorité 2 : un mot commence par la lettre
      const aWord = aLower.split(" ").some(w => w.startsWith(searchText));
      const bWord = bLower.split(" ").some(w => w.startsWith(searchText));

      if (aWord !== bWord) return aWord ? -1 : 1;

      // priorité 3 : ordre alphabétique
      return a.localeCompare(b);
    });

  result.innerHTML = filtered.join("<br>");
});

/*

function twoSum (nums, target) {
  const seen = {};

  for(let i = 0; i < nums.length; i++) {

    const current = nums[i];
    const needed = target - current;

    if (seen[needed] !== undefined) {
      return [seen[needed], i];
    }
    seen[current] = i;
  }
}

console.log(twoSum([2, 7, 11, 15, 1, 3, 4, 9, 8, 5, 12, 10, 1], 27));

function findSum (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
};
console.log(findSum([9, 8, 7, 2, 5, 6, 4, 1, 3, 10], 16));
*/
/*
function findSum (nums, target) {
  const map = {};
  for(let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const total = target - current;

    if (map[total] !== undefined) {
      return [map[total], i];
    }
    map[current] = i;
  }
}

console.log(findSum2([1, 5, 9, 11, 15, 0, -1, 3, -5], 8));

function findSum2 (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const total = target - nums[i];
    if (map.has(total)) {
      return [map.get(total), i];
    }
    map.set(nums[i], i);
  }
  return [];
};
*/
/*
function findTripleSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const map = new Map();
    const total = target - nums[i];

    for (let j = i + 1; j < nums.length; j++) {
      const newTotal = total - nums[j];

      if (map.has(newTotal)) {
        return [i, map.get(newTotal), j];
      }

      map.set(nums[j], j);
    }
  }
  return [];
}

console.log(findTripleSum([11, 2, 1, 5, 3, 4, 6, 7, 8, 9, 10, 50, 70], 121));
*/

function isNumPalindrom (x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let reversed = 0;

  while(x > reversed) {
    const lastDigit = x % 10;
    reversed = reversed * 10 + lastDigit;
    x = Math.floor(x / 10);
  }
  return x === reversed || x === Math.floor(reversed / 10);
}

console.log(isNumPalindrom(121));
console.log(isNumPalindrom(5520155));
console.log(isNumPalindrom(123321));
console.log(isNumPalindrom(22322));
console.log(isNumPalindrom(1234567));


function twoSum (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const total = target - nums[i];
    if (map.has(total)) {
      return [map.get(total), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 18));

function double (nums) {
  const map = new Map();

  for (let num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    }
    else {
      map.set(num, 1);
    }
  }

  const duplicated = [];
  for (const [num, count] of map.entries()) {
    if (count > 1) {
      duplicated.push(`${num} (${count} fois)`);
    }
  }

  if (duplicated.length === 0) {
    return "Aucune Répétition Détécté";
  }

  else {
    return "Le(s) Chiffre(s) répétés : " + duplicated.join(", ");
  }
}

console.log(double([1, 2, 3, 4, 1, 1, 2, 5]));
console.log(double([11, 1, 111, -1, -11, -111, 2, 11]));

function once (nums) {
  const map = new Map();

  for (let num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    }
    else {
      map.set(num, 1);
    }
  }

  const uniques = [];

  for (let [num, count] of map.entries()) {
    if (count === 1) {
      uniques.push(`${num}`);
    }
  }

  if (uniques.length === 0) {
    return "Aucun Chiffre Unique Détécté";
  }
  else {
    return "Chiffre(s) Unique(s) : " + uniques.join(", ");
  }
}

console.log(once([1, 2, 2, 3, 4, 1, 4, 5, 5, 6]));

function uniqueLetter(sentence) {
  const map = new Map();
  for (let carachteres of sentence) {
    carachteres = carachteres.toLowerCase();
    if (carachteres === " ") continue;

    if (map.has(carachteres)) {
      map.set(carachteres, map.get(carachteres) + 1);
    }
    else {
      map.set(carachteres, 1);
    }
  }

  const uniques = [];

  for (let [carachteres, count] of map.entries()) {
    if (count === 1) {
      uniques.push(`${carachteres}`);
    }
  }

  if (uniques.length === 0) {
    return "Aucune lettre Unique n'a était trouvé dans cette Phrase/Mot";
  }
  else {
    return "Lettre(s) Unique dans la Phrase/Mot(s) :" + uniques.join(", ");
  }
}

console.log(uniqueLetter("bonJOur lE MonDe"));

function firstNonRepeatedLetter (str) {
  const map = new Map();
  str = str.toLowerCase();

  for (let char of str) {
    if (char === " ") continue;
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    }
    else {
      map.set(char, 1);
    }
  }
  
  for (let char of str) {
    if (map.get(char) === 1) {
      return "La Premiere Lettre Unique est : " + char.toUpperCase();
    }
    
  }
  
 
  return "Aucune Lettre Unique";

}

console.log(firstNonRepeatedLetter("stReSs"));
console.log(firstNonRepeatedLetter("LEet COde"));
console.log(firstNonRepeatedLetter("KaDweW"));
console.log(firstNonRepeatedLetter("aabbcc"));







const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const stars = [];
const numStars = 1000;
let speed = 0.1;

// Ajuster la taille du canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars.forEach(star => star.reset());
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


// Classe étoile
class Star {
  constructor() {
    this.reset();
}

reset() {
  this.x = Math.random() * canvas.width - canvas.width / 2;
  this.y = Math.random() * canvas.height - canvas.height / 2;
  this.z = Math.random() * canvas.width;
  this.prevX = this.x;
  this.prevY = this.y;
}

update() {
  this.prevX = this.x;
  this.prevY = this.y;
                
  // Déplacer l'étoile vers nous
  this.z -= speed;

  // Si l'étoile est passée, la réinitialiser
  if (this.z <= 0) {
    this.reset();
  }
}

draw() {
  // Projection 3D vers 2D
  const x = (this.x / this.z) * canvas.width + canvas.width / 2;
  const y = (this.y / this.z) * canvas.height + canvas.height / 2;
                
  const prevX = (this.prevX / (this.z + speed)) * canvas.width + canvas.width / 2;
  const prevY = (this.prevY / (this.z + speed)) * canvas.height + canvas.height / 2;

  // Taille de l'étoile basée sur la distance
  const size = (1 - this.z / canvas.width) * 3;
                
  // Opacité basée sur la distance
  const opacity = 1 - this.z / canvas.width;

  // Dessiner la traînée (ligne)
  ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Dessiner l'étoile (point)
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  }
}

// Créer les étoiles
for (let i = 0; i < numStars; i++) {
  stars.push(new Star());
}

// Animation
function animate() {
  // Effet de traînée
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mettre à jour et dessiner chaque étoile
  stars.forEach(star => {
    star.update();
    star.draw();
    });

  requestAnimationFrame(animate);
}

animate();

// Contrôle de la vitesse
function changeSpeed(mode) {
  switch(mode) {
    case 'slow':
      speed = 1;
      break;
    case 'normal':
      speed = 2;
      break;
    case 'fast':
      speed = 5;
      break;
    case 'warp':
      speed = 15;
      break;
  }
}


class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  bark() {
    console.log(`Woof!`);
  }
}

let myDog = new Dog ("Biscuit", 42);
myDog.bark();

console.log(myDog.name);
console.log(`${myDog.age} ans`);

class Counter {
  constructor() {
    this.counter = 0;
  }

  increment() {
    this.counter ++;
    console.log(this.counter); 
  }

  decrement() {
    this.counter --;
    console.log(this.counter);
  }
}

let myCounter = new Counter ();

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp') {
    myCounter.increment();
  }
  if (event.key === 'ArrowDown') {
    myCounter.decrement();
  }
});

class Personne {
  constructor(prenom, nom) {
    this.prenom = prenom;
    this.nom = nom;
  }

  sePresenter() {
    console.log(`Bonjour, je suis ${this.prenom} ${this.nom}.`);
  }
}

let myPersonne = new Personne("Salim", "Hamza");
myPersonne.sePresenter();

class BanqueCompte {
  constructor(soldeInitial) {
    this.solde = soldeInitial
    console.log(`Solde : ${this.solde}€`);
  }

  deposer(montant) {
    this.solde += montant;
    console.log(`Argent Déposées : +${montant}€ || Nouveaux Montant : ${this.solde}€`);
  }

  retirer(montant) {
    if (montant > this.solde) {
      console.log(`Impossible de Retirez le montant ${montant}€, Montant Dissponible : ${this.solde}€`);
    }
    else {
      this.solde -= montant;
      console.log(`Argent retiré : -${montant}€ || Nouveau solde : ${this.solde}€`);
    }
  }
}

let monCompte = new BanqueCompte(5000);

monCompte.deposer(1000);
monCompte.retirer(150);
monCompte.retirer(500);
monCompte.deposer(5000);
monCompte.retirer(10000);
monCompte.retirer(400);

const img = new Image();
img.onload = function() {
  console.log("✅ L'image est chargée !");
};

console.log("🔄 Je commence a charger l'image...");
img.src = "https://picsum.photos/200";
console.log("⏳ L'image est en train de charger...");



function intervalAleatoire() {
  const delai = Math.floor(Math.random() * 100000) + 10000;
  console.log(`Tic (délai: ${delai}ms)`);

  setTimeout(intervalAleatoire, delai);
}

intervalAleatoire();

function averageCalc (numbers) {
  let total = 0;
  numbers.forEach(number => {
    total += number
  });
  let average = total / numbers.length;
  return average;
  
}

console.log(averageCalc([10, 20, 30]));
console.log(averageCalc([5, 15, 25, 35]));
console.log(averageCalc([30, 40, 50]));
console.log(averageCalc([11, 36, 99]));

function returnWords(word) {
  return word.split("").reverse().join("");
}

console.log(returnWords("bonjour"));
console.log(returnWords("JaVaScript"));
console.log(returnWords("hello"));

function vowelsCounter (word) {
  const vowels = ['a', 'i', 'u', 'e', 'o', 'y'];
  let counter = 0;

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i].toLowerCase())){
      counter++;
    }
  }
  return counter;
}

console.log(vowelsCounter("bonjour"));
console.log(vowelsCounter("JaVaScript"));
console.log(vowelsCounter("hello"));


function estPalindrome (word) {
  let reversedWord = word.split("").reverse().join("");
  return reversedWord === word;
}

console.log(estPalindrome("radar"));
console.log(estPalindrome("kayak"));
console.log(estPalindrome("bonjour"));
console.log(estPalindrome("ete"));

function isFizzBuzz(n) {
  let numbers = [];

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      numbers.push("FizzBuzz");
    }
    else if (i % 3 === 0) {
      numbers.push("Fizz");
    }
    else if (i % 5 === 0) {
      numbers.push("Buzz");
    }
    else {
      numbers.push(i);
    }
  }
  return numbers;
}

console.log(isFizzBuzz(15));


const chart = [];
const products = [
  { name: "Need for Speed Carbon", price: 10, quantity: 100 },
  { name: "Pro Evolution Soccer 2011", price: 120, quantity: 23 },
  { name: "Assassin's Creed II", price: 20, quantity: 45 }
];

function addChart (name, price, quantity) {

  const haveProduct = chart.find(product => product.name === name);

  if (haveProduct) {
    haveProduct.quantity += quantity;
  }
  else {
    chart.push({name, price, quantity});
  }

  localStorage.setItem('chart', JSON.stringify(chart));
  console.log("Product Added !");
  console.log(chart);
}
addChart("Need for Speed Carbon", 10, 1);
addChart("Need for Speed Carbon", 10, 2);
addChart("Pro Evolution Soccer 2011", 20, 1);

function totalCount() {
  let total = 0;
  for (let i = 0; i < chart.length; i++) {
    let allQuantities = chart[i].price * chart[i].quantity;
    total += allQuantities;
  }
  return `${total}€`;
}

console.log(totalCount());

let prenom = "kadwew";
let age = 23;

console.log(`je m'appelle ${prenom} et j'ai ${age}`);

if (age >= 18) {
  console.log("Majeure");
}
else {
  console.log("Mineur");
}

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

function addition (x, y) {
  let somme = x + y;
  return somme;
}
console.log(addition(5, 3));

const newGames = ["gta6", "tes6", "forza7", "ea fc 27", "nostale2"];

console.log(newGames[0]);
console.log(newGames[4]);
console.log(newGames.length);

const fruitss = ["pomme", "banane", "orange"];

fruitss.forEach(fruit =>  {
  console.log(fruit);
});

const nombres = [10, 20, 30];
nombres.push(40);
console.log(nombres);
console.log(nombres.length);

const message = document.getElementById('message');
message.textContent = "Salut";

const myBtn = document.getElementById('myBtn');

myBtn.addEventListener('click', () => {
  console.log("Boutton cliquer !");
});

const myName = document.getElementById('myName');
const submitName = document.getElementById('submitName');

submitName.addEventListener('click', () => {
  console.log(myName.value);
});

const ages = [12, 18, 25, 15, 30, 16];
const plusDe18 = [];
const majeur = ages.filter(age => age >= 18);

console.log(majeur);

const comptes = [
  { name: "Alice", age: 25},
  { name: "Bob", age: 30},
  { name: "Karim", age: 20}
];

const bob = comptes.find(compte => compte.name.toLowerCase() === "bob");
console.log(bob.age);

const prenoms = ["Zelda", "Mario", "Link", "Peech"];

prenoms.sort()
console.log(prenoms);

const prix = [10, 20, 30];

const doublePrix = prix.map(prix => prix * 2);
console.log(doublePrix);

const games =
  { 
    title: "GTA VI",
    price: 79,
    isHot: true 
  };

console.log(games.title);

const players = {
  name: "Alex",
  score: 100
};

players.score += 50;
players.level = 5;

console.log(players);

const jeuxVideo = [
  { title: "Fortnite", price: 0},
  { title: "GTA V", price: 30},
  { title: "MMinecraft", price: 20},
  { title: "Nostale", price: 0}
];

const freeGames = jeuxVideo.filter(game => game.price === 0);

console.log(freeGames);

freeGames.forEach(game => {
  console.log(game.title);
});


const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
  if (taskInput.value.trim() === "") {
    alert("Veuillez entrer une tâche a faire !");
    return;
  }

  const newTask = document.createElement('li');
  newTask.textContent = taskInput.value;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Supprimer";

  deleteBtn.addEventListener('click', () => {
    newTask.remove();
  });

  newTask.appendChild(deleteBtn);

  taskList.appendChild(newTask);

  taskInput.value = "";

});



let panier = [];
let affichage = document.getElementById('affichage');
let total = document.getElementById('total');

function ajouterProduit(nom, prix) {
  panier.push({nom: nom, prix: prix});
  console.log(panier);
  let newProduit = document.createElement('div');
  newProduit.textContent = `Ajout de ${nom}: ${prix}€`;
  affichage.append(newProduit);
  afficherTotal();
}

function afficherTotal() {
  let totalPrix = 0;
  panier.forEach(produit => {
    totalPrix += produit.prix;
  }); 

  total.textContent = `Prix total du panier est : ${totalPrix}€`;
  console.log(`Prix total du panier est: ${totalPrix}€`);


}

function viderPanier() {
  panier = [];
  affichage.textContent = "";
  total.textContent = `Vous avez vider le panier !`;
  console.log(`Vous avez videz le panier !`);
}




let reaction = {
  like: 156017,
  dislike: 25500
};

function react(type) {
  console.log("Le type est: " + type);

  if(type === 'like') {
    reaction.like++;
    console.log(reaction.like);
  }
  else if (type === 'dislike') {
    reaction.dislike++;
    console.log(reaction.dislike);
  }
  displayCounter();
}

function calculateRatio() {
  return reaction.like + reaction.dislike;
}

function displayCounter() {
  let counter = document.getElementById('counter');
  counter.textContent = `👍 ${reaction.like} | 👎 ${reaction.dislike} Total Vote(s): ${calculateRatio()}`;
}

function reset() {
  reaction.like = 0;
  reaction.dislike = 0;
  displayCounter();
}



let tasksInput = document.getElementById('tasksInput');
let tasks = [];

function addTask() {
  if (tasksInput.value.length === 0) {
    console.log("Veuillez Ajouter une Tâche Valide");  
  }

  else {
    let inputValue = tasksInput.value;
    let task = {
      id: Date.now(),
      texte: inputValue,
      complete: false
    }
    console.log(tasks);
    tasks.push(task);

    tasksInput.value = "";
    displayTask();
  }
  
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  task.complete = !task.complete;
  console.log(task);
  displayTask();
}

function deleteTask(id) {
  let theTask = tasks.filter(task => task.id !== id);
  tasks = theTask;
  displayTask();
}

function taskCounter() {
  let tasksCompleted = tasks.filter(task => task.complete === true);
  let tasksRemaining = tasks.filter(task => task.complete === false);
  let total = tasksCompleted.length + tasksRemaining.length;
  return { total, tasksCompleted: tasksCompleted.length, tasksRemaining: tasksRemaining.length };
}

function displayTask() {
  const newTaskList = document.getElementById('newTaskList');
  newTaskList.innerHTML = "";
  tasks.forEach(task => {
    let div = document.createElement('div');
    div.className = 'tache';

    const texte = document.createElement('span');
    texte.textContent = task.texte;
    if (task.complete) {
      texte.className = 'complete';
    }

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '✅';
    toggleBtn.onclick = () => toggleTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.onclick = () => deleteTask(task.id);

    div.append(texte);
    div.append(toggleBtn);
    div.append(deleteBtn);
    newTaskList.append(div);
  });
  
  const statsData = taskCounter();
  const stats = document.getElementById('stats');
  stats.innerHTML = `Total: ${statsData.total}, Completed: ${statsData.tasksCompleted}, Remaining: ${statsData.tasksRemaining}`;
}
/*
let isDragging = false;
let currentElement = null;
let offsetX, offsetY;

const Rbox = document.getElementById('box');

Rbox.addEventListener('mousedown', (e) => {
  isDragging = true;
  currentElement = Rbox;
  offsetX = e.clientX - Rbox.offsetLeft;
  offsetY = e.clientY - Rbox.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    currentElement.style.left = (e.clientX - offsetX) + 'px';
    currentElement.style.top = (e.clientY - offsetY) + 'px';
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});
*/
/*
let isDragging = false;
let currentElement = null;
let offsetX, offsetY;
let mouseX = 0, mouseY = 0; // ← Stocker la position de la souris

const Rbox = document.getElementById('box');

Rbox.addEventListener('mousedown', (e) => {
  isDragging = true;
  currentElement = Rbox;
  offsetX = e.clientX - Rbox.offsetLeft;
  offsetY = e.clientY - Rbox.offsetTop;
});

document.addEventListener('mousemove', (e) => {
  // On stocke juste la position, on ne bouge pas encore
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// ← NOUVELLE PARTIE : Animation fluide
function animatee() {
  if (isDragging) {
    currentElement.style.left = (mouseX - offsetX) + 'px';
    currentElement.style.top = (mouseY - offsetY) + 'px';
  }
  requestAnimationFrame(animatee); // Boucle à 60fps
}

animatee(); // Lance l'animation
*/

const Rbox = document.getElementById('box');

// C'est tout ! Une seule ligne ! 🎉
Draggable.create(Rbox, {
  type: "x,y"  // Peut se déplacer en X et Y
});


Draggable.create(Rbox, {
  type: "x,y",
  bounds: "body",           // Ne peut pas sortir de la page
  inertia: true,            // Effet d'inertie (rebond)
  edgeResistance: 0.65,     // Résistance aux bords
  onDragStart: function() {
    console.log("Début du drag");
  },
  onDrag: function() {
    console.log("En train de glisser");
  },
  onDragEnd: function() {
    console.log("Fin du drag");
  }
});