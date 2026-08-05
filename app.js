(() => {
  "use strict";

  const CONFIG = {
    eventDate: "2026-08-15T12:00:00-06:00",
    whatsappNumber: "5215529134341",
    eventName: "Baby Shower y revelación de género de Gloria y Anthar"
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const loader = $("#loader");
  const intro = $("#intro");
  const startBtn = $("#startBtn");
  const music = $("#music");
  const musicBtn = $("#musicBtn");
  const menuBtn = $("#menuBtn");
  const navMenu = $("#navMenu");
  const canvas = $("#effects");

  let musicPlaying = false;
  let selectedPrediction = sessionStorage.getItem("babyRevealPrediction") || "";

  function hideLoader() {
    loader?.classList.add("hide");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hideLoader, { once: true });
  } else {
    hideLoader();
  }
  window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 1800);

  async function playMusic() {
    if (!music) return;
    try {
      music.volume = 0.36;
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
    burst(window.innerWidth / 2, window.innerHeight * 0.45, 140);
    window.setTimeout(() => intro?.remove(), 900);
  });

  musicBtn?.addEventListener("click", () => musicPlaying ? pauseMusic() : playMusic());
  menuBtn?.addEventListener("click", () => navMenu?.classList.toggle("open"));
  $$("#navMenu a").forEach(link => link.addEventListener("click", () => navMenu?.classList.remove("open")));

  const revealElements = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  const targetDate = new Date(CONFIG.eventDate).getTime();
  function updateCountdown() {
    const distance = Math.max(0, targetDate - Date.now());
    const values = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance % 86400000) / 3600000),
      minutes: Math.floor((distance % 3600000) / 60000),
      seconds: Math.floor((distance % 60000) / 1000)
    };
    Object.entries(values).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) element.textContent = String(value).padStart(2, "0");
    });
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const predictionButtons = $$("[data-prediction]");
  const hiddenPrediction = $("#hiddenPrediction");
  const predictionConfirmation = $("#predictionConfirmation");

  function renderPrediction() {
    predictionButtons.forEach(button => {
      const selected = button.dataset.prediction === selectedPrediction;
      button.setAttribute("aria-pressed", String(selected));
      const action = $(".prediction-action", button);
      if (action) {
        action.textContent = selected
          ? "Predicción seleccionada"
          : button.dataset.prediction === "Pequeña guerrera" ? "Elegir a Milk" : "Elegir a Goku";
      }
    });
    if (hiddenPrediction) hiddenPrediction.value = selectedPrediction;
    if (predictionConfirmation) {
      predictionConfirmation.textContent = selectedPrediction
        ? `Tu predicción es: ${selectedPrediction}. Para cambiarla, selecciona la otra opción.`
        : "Aún no has elegido tu predicción.";
    }
    const dressCard = document.getElementById("dressCodeCard");
const dressTitle = document.getElementById("dressCodeTitle");
const dressText = document.getElementById("dressCodeText");

if (dressCard && dressTitle && dressText) {

    dressCard.classList.remove("pink","blue");

    if(selectedPrediction === "Pequeña guerrera"){

        dressCard.classList.add("pink");

        dressTitle.textContent="🩷 Dress Code";

        dressText.textContent=
        "Tu equipo es Pequeña Guerrera. ¡Ven con una prenda rosa!";

    }

    else if(selectedPrediction==="Pequeño saiyajin"){

        dressCard.classList.add("blue");

        dressTitle.textContent="🩵 Dress Code";

        dressText.textContent=
        "Tu equipo es Pequeño Saiyajin. ¡Ven con una prenda azul!";

    }

    else{

        dressTitle.textContent="Dress Code";

        dressText.textContent=
        "Elige tu predicción para conocer el color.";

    }

}
  }

  predictionButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedPrediction = button.dataset.prediction || "";
      sessionStorage.setItem("babyRevealPrediction", selectedPrediction);
      renderPrediction();
      const rect = button.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 110,
        selectedPrediction === "Pequeña guerrera"
          ? ["#ff5aa7", "#ffd0e4", "#ffd84a"]
          : ["#3fa9ff", "#d0efff", "#ffd84a"]);
    });
  });
  renderPrediction();

  const shenlongButton = $("#shenlongButton");
  const giftWishes = $("#giftWishes");
  const wishMessage = $("#wishMessage");

  shenlongButton?.addEventListener("click", () => {
    if (!giftWishes) return;
    const opening = giftWishes.hasAttribute("hidden");
    if (opening) {
      giftWishes.removeAttribute("hidden");
      shenlongButton.setAttribute("aria-expanded", "true");
      shenlongButton.classList.add("awakened");
      if (wishMessage) wishMessage.textContent = "¡Sheng Long ha revelado las mesas de regalos!";
      giftWishes.scrollIntoView({ behavior: "smooth", block: "nearest" });
      const rect = shenlongButton.getBoundingClientRect();
      burst(rect.left + rect.width / 2, Math.min(window.innerHeight - 80, rect.top + rect.height / 2), 180,
        ["#ffd84a", "#ff8a00", "#83e37d", "#ffffff"]);
    } else {
      giftWishes.setAttribute("hidden", "");
      shenlongButton.setAttribute("aria-expanded", "false");
      shenlongButton.classList.remove("awakened");
      if (wishMessage) wishMessage.textContent = "";
    }
  });

  const galleryGrid = $("#galleryGrid");
  const galleryStatus = $("#galleryStatus");
  async function loadGallery() {
    if (!galleryGrid || !galleryStatus) return;
    try {
      const response = await fetch("https://api.github.com/repos/alan20tm-ui/baby_reveal/contents/assets/galeria", {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const files = await response.json();
      const images = files.filter(file => /\.(png|jpe?g|webp|gif)$/i.test(file.name))
        .sort((a, b) => a.name.localeCompare(b.name, "es"));
      if (!images.length) return;
      galleryGrid.innerHTML = "";
      galleryStatus.textContent = `${images.length} recuerdo${images.length === 1 ? "" : "s"} disponible${images.length === 1 ? "" : "s"}.`;
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
      console.info("Galería aún no disponible.", error);
    }
  }
  loadGallery();

  $("#rsvpForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#guestName")?.value.trim() || "";
    const count = $("#guestCount")?.value || "1";
    const message = $("#guestMessage")?.value.trim() || "";
    if (!name) { $("#guestName")?.focus(); return; }
    if (!selectedPrediction) {
      alert("Antes de confirmar, elige arriba si crees que será pequeña guerrera o pequeño saiyajin.");
      $("#equipos")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const text = [
      "Hola Gloria y Anthar 👶🐉",
      "",
      `Soy ${name} y confirmo mi asistencia a su Baby Shower y revelación de género.`,
      `Asistentes: ${count}.`,
      `Mi predicción: ${selectedPrediction}.`,
      message ? `Mensaje: ${message}` : ""
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  });

  let ctx = null;
  let particles = [];
  let animationFrame = null;
  if (canvas) ctx = canvas.getContext("2d");

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function burst(x, y, count = 120, colors = ["#ff5aa7", "#3fa9ff", "#ffd84a", "#ff8a00"]) {
    if (!canvas || !ctx) return;
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 9;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 3,
        gravity: 0.12 + Math.random() * 0.1, size: 4 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)], life: 1,
        decay: 0.01 + Math.random() * 0.015 });
    }
    if (!animationFrame) animate();
  }

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.vx *= 0.985; p.vy = p.vy * 0.985 + p.gravity; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size * 0.65);
    });
    ctx.globalAlpha = 1;
    animationFrame = particles.length ? window.requestAnimationFrame(animate) : null;
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeCanvas();
})();
