// ======================
// COUNTDOWN
// ======================
let total = 3 * 24 * 60 * 60 + 3 * 60 * 60 + 29 * 60 + 55;

setInterval(() => {
  total--;
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  document.getElementById("d").innerText = d.toString().padStart(2, "0");
  document.getElementById("h").innerText = h.toString().padStart(2, "0");
  document.getElementById("m").innerText = m.toString().padStart(2, "0");
  document.getElementById("s").innerText = s.toString().padStart(2, "0");
}, 1000);

// ======================
// PARTICLES (BLUE + PURPLE, PREMIUM)
// ======================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Meaningful symbols only
const symbols = ["₿", "Ξ", "◈"];
const PARTICLE_COUNT = 36;

const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 6 + 10,
  speed: Math.random() * 0.17 + 0.08,
  symbol: symbols[Math.floor(Math.random() * symbols.length)],
  opacity: Math.random() * 0.06 + 0.03,
  color: Math.random() > 0.5 ? "#5ee7ff" : "#9b8cff" // blue + purple
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.globalAlpha = p.opacity;
    ctx.font = `${p.size}px monospace`;
    ctx.fillStyle = p.color;
    ctx.fillText(p.symbol, p.x, p.y);

    p.y -= p.speed;

    if (p.y < -20) {
      p.y = canvas.height + 20;
      p.x = Math.random() * canvas.width;
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
