/* =====================================================
   rotsl Interactive Theme
   - Dog moves between sections
   - Bulb toggles illumination
   - Random procedural sound per section
   ===================================================== */

window.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */

  const dog = document.getElementById("mascot");
  const sections = document.querySelectorAll("section");
  const bulb = document.getElementById("bulb");

  /* ================= AUDIO SETUP ================= */

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContextClass();

  function playRandomTone() {

    if (audioCtx.state === "suspended") return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const frequencies = [220, 262, 330, 392, 440, 523, 659, 880];
    const waveTypes = ["sine", "triangle", "square"];

    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
    const randomWave = waveTypes[Math.floor(Math.random() * waveTypes.length)];

    oscillator.type = randomWave;
    oscillator.frequency.value = randomFreq;

    const now = audioCtx.currentTime;

    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    oscillator.start(now);
    oscillator.stop(now + 0.35);
  }

  /* ================= ENABLE AUDIO ON FIRST CLICK ================= */

  document.body.addEventListener("click", () => {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }, { once: true });

  /* ================= DOG MOVEMENT ================= */

  let currentSection = 0;

  function moveDog() {

    if (!sections.length) return;

    const section = sections[currentSection];
    const rect = section.getBoundingClientRect();

    const absoluteTop =
      window.scrollY +
      rect.top +
      rect.height -
      30;

    dog.style.top = absoluteTop + "px";

    playRandomTone();

    currentSection = (currentSection + 1) % sections.length;
  }

  /* Initial position */
  moveDog();

  /* Move every 4 seconds */
  setInterval(moveDog, 4000);

  /* ================= BULB TOGGLE ================= */

  if (bulb) {
    bulb.addEventListener("click", () => {
      document.body.classList.toggle("light-on");
    });
  }

});
