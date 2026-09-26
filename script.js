const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");

const CELLS = 24;
const CELL = canvas.width / CELLS;
const STORAGE_KEY = "mauvidev-snake-best";

let snake, food, direction, nextDirection;
let score = 0;
let best = Number(localStorage.getItem(STORAGE_KEY) || 0);
let timer;
let running = false;
let paused = false;
let ended = false;

bestEl.textContent = best;

function resetGame() {
  snake = [
    { x: 11, y: 12 },
    { x: 10, y: 12 },
    { x: 9, y: 12 },
  ];

  direction = { x: 1, y: 0 };
  nextDirection = { ...direction };
  score = 0;

  scoreEl.textContent = score;
  running = false;
  paused = false;
  ended = false;

  clearInterval(timer);
  pauseBtn.textContent = "⏸ Jeda";
  pauseBtn.disabled = true;

  placeFood();
  draw();
}

function placeFood() {
  do {
    food = {
      x: Math.floor(Math.random() * CELLS),
      y: Math.floor(Math.random() * CELLS),
    };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
}

function roundedRect(context, x, y, w, h, r) {
  context.beginPath();
  context.roundRect(x, y, w, h, r);
  context.fill();
}

function draw() {
  ctx.fillStyle = "#0d1627";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid papan
  ctx.strokeStyle = "rgba(140, 164, 202, 0.07)";
  ctx.lineWidth = 1;

  for (let i = 0; i <= CELLS; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL, 0);
    ctx.lineTo(i * CELL, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * CELL);
    ctx.lineTo(canvas.width, i * CELL);
    ctx.stroke();
  }

  // Makanan
  const fx = food.x * CELL + CELL / 2;
  const fy = food.y * CELL + CELL / 2;

  ctx.fillStyle = "#ff687c";
  ctx.beginPath();
  ctx.arc(fx, fy, CELL * 0.34, 0, Math.PI * 2);
  ctx.fill();

  // Tangkai apel
  ctx.strokeStyle = "#8ee6a9";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(fx + 1, fy - CELL * 0.27);
  ctx.quadraticCurveTo(
    fx + 4,
    fy - CELL * 0.52,
    fx + CELL * 0.22,
    fy - CELL * 0.42,
  );
  ctx.stroke();

  // Ular
  snake.forEach((part, index) => {
    const pad = index === 0 ? 2 : 3;
    const x = part.x * CELL + pad;
    const y = part.y * CELL + pad;
    const size = CELL - pad * 2;

    ctx.fillStyle = index === 0 ? "#f1c779" : "#72dba5";
    roundedRect(ctx, x, y, size, size, 6);

    if (index === 0) drawEyes(part);
  });
}

function drawEyes(head) {
  const cx = head.x * CELL;
  const cy = head.y * CELL;
  const r = CELL * 0.055;

  let eyes;

  if (direction.x === 1) {
    eyes = [
      [cx + CELL * 0.68, cy + CELL * 0.3],
      [cx + CELL * 0.68, cy + CELL * 0.7],
    ];
  } else if (direction.x === -1) {
    eyes = [
      [cx + CELL * 0.32, cy + CELL * 0.3],
      [cx + CELL * 0.32, cy + CELL * 0.7],
    ];
  } else if (direction.y === -1) {
    eyes = [
      [cx + CELL * 0.3, cy + CELL * 0.32],
      [cx + CELL * 0.7, cy + CELL * 0.32],
    ];
  } else {
    eyes = [
      [cx + CELL * 0.3, cy + CELL * 0.68],
      [cx + CELL * 0.7, cy + CELL * 0.68],
    ];
  }

  ctx.fillStyle = "#172033";

  eyes.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, r * 1.7, 0, Math.PI * 2);
    ctx.fill();
  });
}

function startGame() {
  if (ended) resetGame();

  running = true;
  paused = false;

  overlay.classList.add("hidden");
  pauseBtn.disabled = false;
  pauseBtn.textContent = "⏸ Jeda";

  clearInterval(timer);
  timer = setInterval(tick, Math.max(68, 145 - score * 2));
}

function tick() {
  if (!running || paused) return;

  direction = { ...nextDirection };

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  const ate = head.x === food.x && head.y === food.y;
  const bodyToCheck = ate ? snake : snake.slice(0, -1);

  // Tabrakan dengan dinding atau tubuh sendiri
  if (
    head.x < 0 ||
    head.x >= CELLS ||
    head.y < 0 ||
    head.y >= CELLS ||
    bodyToCheck.some((part) => part.x === head.x && part.y === head.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  if (ate) {
    score += 10;
    scoreEl.textContent = score;

    if (score > best) {
      best = score;
      bestEl.textContent = best;
      localStorage.setItem(STORAGE_KEY, String(best));
    }

    placeFood();

    clearInterval(timer);
    timer = setInterval(tick, Math.max(68, 145 - score * 2));
  } else {
    snake.pop();
  }

  draw();
}

function gameOver() {
  running = false;
  ended = true;

  clearInterval(timer);
  pauseBtn.disabled = true;

  overlayTitle.textContent = "Game Over!";
  overlayText.textContent = `Skor kamu ${score}. Coba lagi dan pecahkan rekor!`;

  startBtn.textContent = "Main Lagi";
  overlay.classList.remove("hidden");
}

function togglePause() {
  if (!running) return;

  paused = !paused;

  pauseBtn.textContent = paused ? "▶ Lanjut" : "⏸ Jeda";

  overlayTitle.textContent = "Game Dijeda";
  overlayText.textContent = "Tekan lanjut untuk meneruskan permainan.";

  startBtn.textContent = "Lanjutkan";
  overlay.classList.toggle("hidden", !paused);
}

function setDirection(dir) {
  const dirs = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  const chosen = dirs[dir];
  if (!chosen) return;

  // Ular tidak bisa langsung berbalik arah
  if (chosen.x === -direction.x && chosen.y === -direction.y) return;

  nextDirection = chosen;
}

// Kontrol keyboard
document.addEventListener("keydown", (event) => {
  const keys = {
    ArrowUp: "up",
    w: "up",
    W: "up",
    ArrowDown: "down",
    s: "down",
    S: "down",
    ArrowLeft: "left",
    a: "left",
    A: "left",
    ArrowRight: "right",
    d: "right",
    D: "right",
  };

  if (keys[event.key]) {
    event.preventDefault();

    if (!running && !ended) startGame();
    setDirection(keys[event.key]);
  }

  if (event.code === "Space") {
    event.preventDefault();

    if (!running && !ended) startGame();
    else togglePause();
  }
});

// Kontrol tombol layar
document.querySelectorAll("[data-dir]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!running && !ended) startGame();
    setDirection(button.dataset.dir);
  });
});

// Tombol mulai dan jeda
startBtn.addEventListener("click", () => {
  if (paused) {
    togglePause();
    return;
  }

  startGame();
});

pauseBtn.addEventListener("click", togglePause);

// Tombol ulangi
restartBtn.addEventListener("click", () => {
  resetGame();

  overlayTitle.textContent = "Siap bermain?";
  overlayText.textContent = "Tekan tombol mulai untuk bermain.";
  startBtn.textContent = "Mulai Game";

  overlay.classList.remove("hidden");
});

// Jalankan tampilan awal
resetGame();
