/* =======================
   GLOBALS
======================= */

let music = document.getElementById("music");
const heartsContainer = document.querySelector(".hearts");

/* =======================
   HEARTS
======================= */

function createHeart(speed = "normal") {
  if (!heartsContainer) return;

  const heart = document.createElement("span");
  heart.innerHTML = Math.random() > 0.5 ? "💙" : "💚";
  heart.style.left = Math.random() * 100 + "vw";

  heart.style.animationDuration =
    speed === "slow"
      ? Math.random() * 4 + 8 + "s"
      : Math.random() * 3 + 4 + "s";

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}

/* =======================
   PAGE 1 — VALENTINE
======================= */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (yesBtn && noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    yesBtn.style.transform = "scale(1.5)";
    noBtn.style.transform =
      `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
  });

  noBtn.addEventListener("mouseleave", () => {
    yesBtn.style.transform = "scale(1)";
  });

  yesBtn.addEventListener("click", () => {
    localStorage.setItem("playMusic", "true");
    for (let i = 0; i < 40; i++) createHeart();
    setTimeout(() => {
      window.location.href = "love.html";
    }, 800);
  });
}

/* =======================
   PAGE 2 — MORE LOVE
======================= */

const moreLoveBtn = document.getElementById("moreLoveBtn");

if (moreLoveBtn) {
  moreLoveBtn.style.display = "inline-block";
  setTimeout(() => {
    moreLoveBtn.style.opacity = "1";
  }, 1000);

  moreLoveBtn.addEventListener("click", () => {
    for (let i = 0; i < 15; i++) createHeart("slow");
    setTimeout(() => {
      window.location.href = "memories.html";
    }, 600);
  });
}

/* =======================
   MUSIC (PAGE 2 & 3)
======================= */

if (music && localStorage.getItem("playMusic") === "true") {
  music.volume = 0.35;
  music.play().catch(() => {});
}

/* =======================
   PAGE 3 — AUTO GALLERY
======================= */

const galleryContainer = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

let galleryImages = [];
let currentIndex = 0;

/* AUTO LOAD IMAGES */
function loadGallery(totalImages = 50) {
  if (!galleryContainer) return;

  for (let i = 1; i <= totalImages; i++) {
    const path = `images/pic${i}.jpg`;
    const img = new Image();
    img.src = path;

    img.onload = () => {
      const index = galleryImages.length;
      galleryImages.push(path);

      const thumb = document.createElement("img");
      thumb.src = path;
      thumb.onclick = () => openModal(index);
      galleryContainer.appendChild(thumb);
    };
  }
}

/* MODAL */
function openModal(index) {
  currentIndex = index;
  modal.style.display = "flex";
  modalImg.src = galleryImages[currentIndex];
}

function closeModal() {
  modal.style.display = "none";
}

/* KEYBOARD NAV */
document.addEventListener("keydown", e => {
  if (!modal || modal.style.display !== "flex") return;

  if (e.key === "ArrowRight")
    currentIndex = (currentIndex + 1) % galleryImages.length;

  if (e.key === "ArrowLeft")
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;

  if (e.key === "Escape") closeModal();

  modalImg.src = galleryImages[currentIndex];
});

/* MOBILE SWIPE */
let startX = 0;

modalImg?.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

modalImg?.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;

  if (endX - startX > 50)
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;

  if (startX - endX > 50)
    currentIndex = (currentIndex + 1) % galleryImages.length;

  modalImg.src = galleryImages[currentIndex];
});

/* INIT GALLERY */
if (galleryContainer) {
  loadGallery();
  setTimeout(() => {
    for (let i = 0; i < 30; i++) createHeart("slow");
  }, 600);
}

/* CONFETTI ON MEMORIES LOAD */
if (galleryContainer) {
  setTimeout(() => {
    for (let i = 0; i < 50; i++) {
      const c = document.createElement("span");
      c.innerHTML = ["💖", "✨", "💙", "💚"][Math.floor(Math.random() * 4)];
      c.style.left = Math.random() * 100 + "vw";
      c.style.top = Math.random() * 100 + "vh";
      c.style.position = "fixed";
      c.style.fontSize = "20px";
      c.style.animation = "confetti 1.6s ease forwards";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 1600);
    }
  }, 700);
}
/* ===== MEMORIES ENHANCEMENTS ===== */

const counter = document.getElementById("counter");
const shuffleBtn = document.getElementById("shuffleBtn");

/* Random open */
shuffleBtn?.addEventListener("click", () => {
  const random = Math.floor(Math.random() * galleryImages.length);
  openModal(random);
});

/* Override openModal */
const originalOpenModal = openModal;
openModal = function (index) {
  currentIndex = index;
  modal.style.display = "flex";
  modalImg.src = galleryImages[currentIndex];
  counter.innerText = `${currentIndex + 1} / ${galleryImages.length}`;
  document.body.classList.add("modal-open");

  // heart burst
  for (let i = 0; i < 12; i++) createHeart("slow");
};

/* Override closeModal */
const originalCloseModal = closeModal;
closeModal = function () {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
};

/* Update counter on navigation */
document.addEventListener("keydown", () => {
  if (modal.style.display === "flex") {
    counter.innerText = `${currentIndex + 1} / ${galleryImages.length}`;
  }
});

/* Ambient dots */
function createAmbient() {
  const dot = document.createElement("span");
  dot.style.left = Math.random() * 100 + "vw";
  dot.style.bottom = "-10px";
  dot.style.animationDuration = Math.random() * 10 + 15 + "s";
  document.querySelector(".ambient")?.appendChild(dot);
  setTimeout(() => dot.remove(), 25000);
}

const ambientLayer = document.createElement("div");
ambientLayer.className = "ambient";
document.body.appendChild(ambientLayer);

setInterval(createAmbient, 800);
