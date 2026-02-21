// assets/app.js

function injectLogos() {
  const template = document.getElementById("logo-template");
  if (!template) return;

  // Inject only into explicit targets (prevents accidental duplicates)
  document.querySelectorAll(".header-logo, .footer-logo").forEach((container) => {
    // idempotent guard
    if (container.dataset.logoInjected === "1") return;

    // ensure clean container (removes any manually embedded SVG/text)
    const clone = template.content.cloneNode(true);
    container.replaceChildren(clone);

    container.dataset.logoInjected = "1";
  });
}

function initMobileMenu() {
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const overlay = document.getElementById("mobile-menu-overlay");
  const panel = document.getElementById("mobile-menu-panel");
  const links = document.querySelectorAll(".mobile-link");

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

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  links.forEach((l) => l.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.classList.contains("translate-x-full")) {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injectLogos();

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  initMobileMenu();
});
