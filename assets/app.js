// assets/app.js

function initMobileMenu() {
  const openBtn = document.getElementById("mobile-menu-btn");
  const overlay = document.getElementById("mobile-menu-overlay");
  const panel = document.getElementById("mobile-menu-panel");

  if (!openBtn || !overlay || !panel) return;

  function closeMenu() {
    overlay.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    openBtn.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    panel.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);
  }

  openBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    overlay.offsetWidth; // force reflow
    overlay.classList.remove("opacity-0");
    panel.classList.remove("translate-x-full");

    openBtn.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    panel.setAttribute("aria-hidden", "false");
  });

  overlay.addEventListener("click", closeMenu);
  panel.addEventListener("click", (e) => {
    if (e.target.closest(".mobile-link, #mobile-menu-close")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.classList.contains("translate-x-full")) {
      closeMenu();
    }
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    initMobileMenu();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initMobileMenu };
}
