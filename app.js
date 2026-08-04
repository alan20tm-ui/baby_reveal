(() => {
  "use strict";

  const CONFIG = {
    eventDate: "2026-08-15T12:00:00-06:00",
    whatsappNumber: "5215529134341",
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








  // Predicción única elegida arriba.
  const predictionButtons = [...document.querySelectorAll("[data-prediction]")];
  const hiddenPrediction = document.getElementById("hiddenPrediction");
  const predictionConfirmation = document.getElementById("predictionConfirmation");

  let selectedPrediction = sessionStorage.getItem("babyRevealPrediction") || "";

  function renderPrediction() {
    predictionButtons.forEach(button => {
      const isSelected = button.dataset.prediction === selectedPrediction;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));

      const action = button.querySelector(".prediction-action");
      if (action) {
        action.textContent = isSelected
          ? "Predicción seleccionada"
          : "Elegir esta opción";
      }
    });

    if (hiddenPrediction) {
      hiddenPrediction.value = selectedPrediction;
    }

    if (predictionConfirmation) {
      predictionConfirmation.textContent = selectedPrediction
        ? `Tu predicción es: ${selectedPrediction}. Para cambiarla, selecciona la otra opción.`
        : "Aún no has elegido tu predicción.";
    }
  }

  predictionButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedPrediction = button.dataset.prediction || "";
      sessionStorage.setItem("babyRevealPrediction", selectedPrediction);
      renderPrediction();

      const rect = button.getBoundingClientRect();
      burst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        110,
        selectedPrediction === "Pequeña guerrera"
          ? ["#ff5aa7", "#ffd0e4", "#ffd84a"]
          : ["#3fa9ff", "#d0efff", "#ffd84a"]
      );
    });
  });

  renderPrediction();

  // Sheng Long revela las mesas de regalos.
  const shenlongButton = document.getElementById("shenlongButton");
  const giftWishes = document.getElementById("giftWishes");
  const wishMessage = document.getElementById("wishMessage");

  shenlongButton?.addEventListener("click", () => {
    const isOpen = !giftWishes?.hasAttribute("hidden");

    if (isOpen) {
      giftWishes?.setAttribute("hidden", "");
      shenlongButton.setAttribute("aria-expanded", "false");
      shenlongButton.classList.remove("awakened");
      if (wishMessage) wishMessage.textContent = "";
      return;
    }

    giftWishes?.removeAttribute("hidden");
    shenlongButton.setAttribute("aria-expanded", "true");
    shenlongButton.classList.add("awakened");

    if (wishMessage) {
      wishMessage.textContent = "¡Sheng Long ha revelado las mesas de regalos!";
    }

    const rect = shenlongButton.getBoundingClientRect();
    burst(
      rect.left + rect.width / 2,
      Math.min(window.innerHeight - 90, rect.top + rect.height / 2),
      190,
      ["#ffd84a", "#ff8a00", "#83e37d", "#ffffff"]
    );
  });

  // Galería automática desde assets/galeria del repositorio público.
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryStatus = document.getElementById("galleryStatus");

  async function loadGallery() {
    if (!galleryGrid || !galleryStatus) return;

    const apiUrl =
      "https://api.github.com/repos/alan20tm-ui/baby_reveal/contents/assets/galeria";

    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: "application/vnd.github+json" }
      });

      if (!response.ok) {
        throw new Error(`Galería no disponible: ${response.status}`);
      }

      const files = await response.json();
      const images = files
        .filter(file => /\.(png|jpe?g|webp|gif)$/i.test(file.name))
        .sort((a, b) => a.name.localeCompare(b.name, "es"));

      if (!images.length) {
        galleryStatus.textContent =
          "Las fotografías estarán disponibles después del evento.";
        return;
      }

      galleryStatus.textContent =
        `${images.length} recuerdo${images.length === 1 ? "" : "s"} disponible${images.length === 1 ? "" : "s"}.`;

      galleryGrid.innerHTML = "";

      images.forEach((file, index) => {
        const figure = document.createElement("figure");
        figure.className = "event-photo";

        const image = document.createElement("img");
        image.src = file.download_url;
        image.alt = `Recuerdo ${index + 1} del Baby Shower de Gloria y Anthar`;
        image.loading = "lazy";

        figure.appendChild(image);
        galleryGrid.appendChild(figure);
      });
    } catch (error) {
      galleryStatus.textContent =
        "Las fotografías estarán disponibles después del evento.";
      console.info(error);
    }
  }

  loadGallery();


  document.getElementById("rsvpForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const count = document.getElementById("guestCount").value;
    const message = document.getElementById("guestMessage").value.trim();
    const prediction = selectedPrediction || "Sin predicción registrada";

    if (!name) return;

    if (!selectedPrediction) {
      alert("Antes de confirmar, elige arriba si crees que será pequeña guerrera o pequeño saiyajin.");
      document.getElementById("equipos")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

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
