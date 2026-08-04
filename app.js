const CONFIG = {
      eventDate: "2027-06-12T17:00:00-06:00",
      whatsappNumber: "5215541946413",
      eventName: "Baby Shower y Gender Reveal"
    };

    const body = document.body;
    const intro = document.getElementById("intro");
    const enterButton = document.getElementById("enterInvitation");
    const music = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
    let musicPlaying = false;

    async function playMusic() {
      try {
        await music.play();
        musicPlaying = true;
        musicToggle.classList.add("playing");
        musicToggle.textContent = "♫";
      } catch (error) {
        musicPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.textContent = "♪";
      }
    }

    function pauseMusic() {
      music.pause();
      musicPlaying = false;
      musicToggle.classList.remove("playing");
      musicToggle.textContent = "♪";
    }

    enterButton.addEventListener("click", () => {
      intro.classList.add("hidden");
      body.classList.remove("locked");
      playMusic();
      createEnergyBurst(window.innerWidth / 2, window.innerHeight / 2, "#ffd740");
    });

    musicToggle.addEventListener("click", () => {
      musicPlaying ? pauseMusic() : playMusic();
    });

    function updateCountdown() {
      const target = new Date(CONFIG.eventDate).getTime();
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        document.getElementById("countdown").innerHTML =
          '<div class="count-box" style="grid-column:1/-1"><strong>¡Hoy!</strong><span>La aventura comienza</span></div>';
        return;
      }

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

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => revealObserver.observe(element));

    const balls = [...document.querySelectorAll(".dragon-ball")];

    function updateDragonBalls() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const activeCount = Math.min(7, Math.max(1, Math.ceil(progress * 7)));

      balls.forEach((ball, index) => {
        ball.classList.toggle("active", index < activeCount);
      });
    }

    window.addEventListener("scroll", updateDragonBalls, { passive: true });
    updateDragonBalls();

    let girlVotes = Number(localStorage.getItem("girlVotes") || 0);
    let boyVotes = Number(localStorage.getItem("boyVotes") || 0);
    let selectedTeam = localStorage.getItem("selectedTeam") || "";

    const girlVotesLabel = document.getElementById("girlVotes");
    const boyVotesLabel = document.getElementById("boyVotes");
    const girlCard = document.getElementById("girlCard");
    const boyCard = document.getElementById("boyCard");
    const guestTeam = document.getElementById("guestTeam");

    function renderVotes() {
      girlVotesLabel.textContent = girlVotes;
      boyVotesLabel.textContent = boyVotes;
      girlCard.classList.toggle("selected", selectedTeam === "girl");
      boyCard.classList.toggle("selected", selectedTeam === "boy");

      if (selectedTeam === "girl") guestTeam.value = "Equipo Milk - Niña";
      if (selectedTeam === "boy") guestTeam.value = "Equipo Goku - Niño";
    }

    document.querySelectorAll(".vote-button").forEach((button) => {
      button.addEventListener("click", () => {
        const team = button.dataset.team;
        const rect = button.getBoundingClientRect();

        if (selectedTeam === team) {
          createEnergyBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, team === "girl" ? "#ff6fae" : "#2f80ed");
          return;
        }

        if (selectedTeam === "girl") girlVotes = Math.max(0, girlVotes - 1);
        if (selectedTeam === "boy") boyVotes = Math.max(0, boyVotes - 1);

        if (team === "girl") girlVotes++;
        if (team === "boy") boyVotes++;

        selectedTeam = team;
        localStorage.setItem("girlVotes", girlVotes);
        localStorage.setItem("boyVotes", boyVotes);
        localStorage.setItem("selectedTeam", selectedTeam);

        renderVotes();
        createEnergyBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, team === "girl" ? "#ff6fae" : "#2f80ed");
        createConfetti();
      });
    });

    renderVotes();

    function createEnergyBurst(x, y, color) {
      for (let i = 0; i < 22; i++) {
        const particle = document.createElement("span");
        const angle = (Math.PI * 2 * i) / 22;
        const distance = 60 + Math.random() * 80;
        const size = 6 + Math.random() * 10;

        particle.className = "energy-particle";
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.boxShadow = `0 0 14px ${color}`;
        particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 900);
      }
    }

    function createConfetti() {
      const colors = ["#ff6fae", "#2f80ed", "#ffd740", "#f57c00", "#6c3bc8"];

      for (let i = 0; i < 45; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * .55}s`;
        piece.style.transform = `rotate(${Math.random() * 180}deg)`;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3800);
      }
    }

    document.getElementById("rsvpForm").addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("guestName").value.trim();
      const count = document.getElementById("guestCount").value;
      const team = document.getElementById("guestTeam").value;

      const message = [
        `Hola, confirmo mi asistencia al ${CONFIG.eventName}.`,
        `Nombre: ${name}`,
        `Asistentes: ${count}`,
        `Predicción: ${team}`,
        "¡Nos vemos para vivir esta gran aventura!"
      ].join("\n");

      const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      createConfetti();
    });
