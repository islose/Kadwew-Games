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

  if (age < 18) {
    result.textContent = "Vous êtes Mineur !";
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
