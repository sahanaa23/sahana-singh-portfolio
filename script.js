(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !open);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }));
  }
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
  const toast = document.querySelector(".toast");
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }
  document.querySelectorAll(".copy-email").forEach(button => {
    button.addEventListener("click", async () => {
      const email = button.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email copied to clipboard");
      } catch {
        window.location.href = \`mailto:\${email}\`;
        showToast("Opening your email app");
      }
    });
  });
  const revealItems = document.querySelectorAll(".section-heading, .about-grid, .project-card, .timeline-item, .detail-panel, .org-row");
  revealItems.forEach(item => item.classList.add("js-reveal"));
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }
})();