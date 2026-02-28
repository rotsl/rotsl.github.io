document.addEventListener("DOMContentLoaded", function () {

  /* ================= SYMBOL OVERLAY ================= */

  const canvas = document.getElementById("symbol-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const symbols = ["λ","∇","π","Σ","μ","α","β","Δ","∞","⊗","Ω","🦠"];

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    size: 16 + Math.random() * 20,
    s: symbols[Math.floor(Math.random() * symbols.length)]
  }));

  function animateSymbols() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.font = p.size + "px serif";
      ctx.fillText(p.s, p.x, p.y);
    });

    requestAnimationFrame(animateSymbols);
  }

  animateSymbols();


  /* ================= BULB ================= */

  const bulb = document.getElementById("bulb");

  if (bulb) {
    bulb.style.width = "20px";
    bulb.style.height = "120px";
    bulb.style.background = "rgba(255,255,255,0.3)";
    bulb.style.borderRadius = "10px";
    bulb.style.cursor = "pointer";

    bulb.addEventListener("click", function () {
      document.body.classList.toggle("lit");
    });
  }


  /* ================= DOG MOVEMENT ================= */

  const dog = document.getElementById("mascot");
  const cards = document.querySelectorAll(".main-projects .flip-card");

  if (dog && cards.length > 0) {

    let index = 0;

    function moveDog() {
      const rect = cards[index].getBoundingClientRect();

      dog.style.left = rect.left + rect.width / 2 + "px";
      dog.style.top = rect.bottom - 10 + "px";

      index = (index + 1) % cards.length;
    }

    moveDog();
    setInterval(moveDog, 2200);
  }

});
