/* ================= DOG MOVING BETWEEN SECTIONS ================= */

const dog = document.getElementById("mascot");
const sections = document.querySelectorAll("section");

let currentSection = 0;

function moveDog() {
  const rect = sections[currentSection].getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top + rect.height - 40;

  dog.style.top = absoluteTop + "px";

  currentSection = (currentSection + 1) % sections.length;
}

moveDog();
setInterval(moveDog, 4000);


/* ================= BULB TOGGLE LIGHT ================= */

const bulb = document.getElementById("bulb");

bulb.addEventListener("click", () => {
  document.body.classList.toggle("light-on");
});
