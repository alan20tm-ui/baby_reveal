(() => {
  "use strict";

  const CONFIG = {
    eventDate: "2026-08-15T12:00:00-06:00",
    whatsappNumber: "5215541946413",
    eventName: "Baby Shower y revelación de género de Gloria y Anthar",
    giftText: "Tu presencia es nuestro mejor regalo. Para más información comunícate con los futuros papás."
  };

  const loader = document.getElementById("loader");
  const intro = document.getElementById("intro");
  const startBtn = document.getElementById("startBtn");
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const energyBtn = document.getElementById("energyBtn");

  let musicPlaying = false;

  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("hide"), 500);
  });

  async function playMusic() {
    if (!music) return;

    try {
      music.volume = 0.38;
      await music.play();
      musicPlaying = true;
      if (musicBtn) musicBtn.textContent = "♫";
    } catch (error) {
      musicPlaying = false;
      if (musicBtn) musicBtn.textContent = "×";
    }
  }

  function pauseMusic() {
    if (!music) return;
    music.pause();
    musicPlaying = false;
    if (musicBtn) musicBtn.textContent = "×";
  }

  startBtn?.addEventListener("click", async () => {
    intro?.classList.add("hide");
    document.body.classList.remove("locked");
    await playMusic();
    burst(window.innerWidth / 2, window.innerHeight * 0.45, 150);

    setTimeout(() => intro?.remove(), 900);
  });

  musicBtn?.addEventListener("click", () => {
    musicPlaying ? pauseMusic() : playMusic();
  });

  menuBtn?.addEventListener("click", () => {
    navMenu?.classList.toggle("open");
  });

  navMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(element => observer.observe(element));

  const targetDate = new Date(CONFIG.eventDate).getTime();

  function updateCountdown() {
    const distance = Math.max(0, targetDate - Date.now());

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const votes = {
    milk: Number(localStorage.getItem("milkVotes") || 0),
    goku: Number(localStorage.getItem("gokuVotes") || 0)
  };

  function renderVotes() {
    document.getElementById("milkVotes").textContent = votes.milk;
    document.getElementById("gokuVotes").textContent = votes.goku;
  }

  document.querySelectorAll("[data-team]").forEach(button => {
    button.addEventListener("click", () => {
      const team = button.dataset.team;
      votes[team] += 1;
      localStorage.setItem(`${team}Votes`, String(votes[team]));
      renderVotes();

      document.getElementById("voteMessage").textContent =
        team === "milk"
          ? "¡Tu energía se unió al Equipo Milk!"
          : "¡Tu energía se unió al Equipo Goku!";

      const rect = button.getBoundingClientRect();
      burst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        90,
        team === "milk"
          ? ["#ff5aa7", "#ffd0e4", "#ffd84a"]
          : ["#3fa9ff", "#d0efff", "#ffd84a"]
      );
    });
  });

  renderVotes();

  const balls = [...document.querySelectorAll(".progress-ball")];

  function updateBalls() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const activeCount = Math.max(1, Math.ceil(progress * balls.length));

    balls.forEach((ball, index) => {
      ball.classList.toggle("active", index < activeCount);
    });
  }

  window.addEventListener("scroll", updateBalls, { passive: true });
  updateBalls();

  energyBtn?.addEventListener("click", () => {
    const section = document.querySelector(".reveal-section");
    const message = document.getElementById("summonMessage");

    section?.classList.remove("summoning", "flash");
    void section?.offsetWidth;
    section?.classList.add("summoning", "flash");

    if (message) {
      message.textContent = "Las siete esferas han respondido... el deseo está cada vez más cerca.";
    }

    burst(window.innerWidth / 2, window.innerHeight / 2, 280);

    setTimeout(() => {
      section?.classList.remove("summoning", "flash");
    }, 900);
  });


  document.getElementById("rsvpForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const count = document.getElementById("guestCount").value;
    const message = document.getElementById("guestMessage").value.trim();
    const prediction =
      document.querySelector('input[name="prediction"]:checked')?.value ||
      "Aún no lo sé";

    if (!name) return;

    const text = [
      `Hola, soy ${name}.`,
      `Confirmo mi asistencia a ${CONFIG.eventName}.`,
      `Asistentes: ${count}.`,
      `Mi predicción: ${prediction}.`,
      message ? `Mensaje: ${message}` : ""
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  const canvas = document.getElementById("effects");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationFrame = null;

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function burst(x, y, count = 120, colors = ["#ff5aa7", "#3fa9ff", "#ffd84a", "#ff8a00"]) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        gravity: 0.12 + Math.random() * 0.1,
        size: 4 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.01 + Math.random() * 0.015
      });
    }

    if (!animationFrame) animate();
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size * 0.65);
    });

    ctx.globalAlpha = 1;

    if (particles.length) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      animationFrame = null;
    }
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeCanvas();
})();
