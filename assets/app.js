document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    lucide.createIcons();
  }

  if (typeof injectLogos === "function") injectLogos();
  if (typeof initMobileMenu === "function") initMobileMenu();
});
