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

const button = document.getElementById("next");

button.addEventListener("click", () => {
  console.log("Vous venez de clicker sur le button next, Félécitation !");
});


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

function getInitial(str) {
  return str
  .split(" ")
  .map(word => word[0])
  .join("")
  .toLowerCase();
}
/*
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

console.log(slugify("La lois de la nature: le monde perdue"));