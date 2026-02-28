// theme.js — bulb-based lighting only

document.addEventListener("DOMContentLoaded", () => {

  const bulb = document.getElementById("bulb");
  const body = document.body;

  if (!bulb) return;

  // restore saved light state
  const saved = localStorage.getItem("lab-light");
  if (saved === "on") {
    body.classList.add("lit");
  }

  function toggleLight() {
    body.classList.toggle("lit");

    const state = body.classList.contains("lit") ? "on" : "off";
    localStorage.setItem("lab-light", state);
  }

  bulb.addEventListener("click", toggleLight);

  bulb.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLight();
    }
  });

});
