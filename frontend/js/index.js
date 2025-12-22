// ======================
// COUNTDOWN TIMER
// ======================
let total = 3 * 24 * 60 * 60 + 3 * 60 * 60 + 29 * 60 + 55;

setInterval(() => {
  if (total <= 0) return;
  total--;

  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  document.getElementById("d").innerText = String(d).padStart(2, "0");
  document.getElementById("h").innerText = String(h).padStart(2, "0");
  document.getElementById("m").innerText = String(m).padStart(2, "0");
  document.getElementById("s").innerText = String(s).padStart(2, "0");
}, 1000);

// ======================
// CANVAS: AI + ROBOT PARTICLES
// ======================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ----------------------
// CONFIG
// ----------------------
const PARTICLE_COUNT = 190;
const ICON_RATIO = 0.35;
const ICONS = ["🤖", "🧠", "⬡", "⛓"];
const particles = [];

// ----------------------
// CREATE PARTICLES
// ----------------------
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const isIcon = Math.random() < ICON_RATIO;

  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: isIcon ? 14 : Math.random() * 2 + 1,
    speedY: Math.random() * 0.15 + 0.05,
    speedX: (Math.random() - 0.5) * 0.05,
    opacity: isIcon ? 0.16 : Math.random() * 0.12 + 0.05,
    type: isIcon ? "icon" : "dot",
    icon: isIcon ? ICONS[Math.floor(Math.random() * ICONS.length)] : null
  });
}

// ----------------------
// DRAW PARTICLES
// ----------------------
function drawParticle(p) {
  ctx.globalAlpha = p.opacity;

  if (p.type === "dot") {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#6ee7ff";
    ctx.fill();
  } else {
    ctx.font = `${p.size}px system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(p.icon, p.x, p.y);
  }
}

// ----------------------
// ANIMATE PARTICLES
// ----------------------
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    drawParticle(p);

    p.y -= p.speedY;
    p.x += p.speedX;

    if (p.y < -50) {
      p.y = canvas.height + 50;
      p.x = Math.random() * canvas.width;
    }

    if (p.x < -50) p.x = canvas.width + 50;
    if (p.x > canvas.width + 50) p.x = -50;
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ======================
// PREMIUM PARALLAX MOTION
// (FOR FLOATING TILES BACKGROUND)
// ======================
const tiles = document.querySelectorAll(".float-tile");

window.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  tiles.forEach((tile, i) => {
    tile.style.transform =
      `translate(${x * (i + 1) * 0.35}px, ${y * (i + 1) * 0.35}px)`;
  });
});
