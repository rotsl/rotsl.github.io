/* ================= WAIT UNTIL DOM LOADS ================= */

window.addEventListener("DOMContentLoaded", () => {

  const dog = document.getElementById("mascot");
  const sections = document.querySelectorAll("section");
  const bulb = document.getElementById("bulb");

  let currentSection = 0;

  function moveDog() {
    const section = sections[currentSection];
    const rect = section.getBoundingClientRect();

    const absoluteTop = window.scrollY + rect.top + rect.height - 20;

    dog.style.top = absoluteTop + "px";

    currentSection = (currentSection + 1) % sections.length;
  }

  moveDog();
  setInterval(moveDog, 4000);

  /* Bulb toggle */
  bulb.addEventListener("click", () => {
    document.body.classList.toggle("light-on");
  });

});
