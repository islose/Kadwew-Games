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

const days = ["monday", "tuesday", "thursday", "wednsday", "friday", "saturday", "sunday"];

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
    else if (count[letter === 1]) {
      console.log(`Dans le mot ${word} toute les lettres sont répéter une seul fois`);
    }
    
  }
  console.log(`La lettre la plus répéter dans ${word} est: ${mostChar}, ${max} fois.`);
}

console.log(mostFrequentChar("kadwew"));
console.log(mostFrequentChar("negolo"));
console.log(mostFrequentChar("abdelsamiii"));
console.log(mostFrequentChar("chat"));




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
