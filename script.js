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
  document.querySelectorAll(".org-info-button").forEach(button => {
    button.addEventListener("click", () => {
      const details = document.querySelector("#org-" + button.dataset.org);
      if (!details) return;
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      details.hidden = isOpen;
      button.querySelector("span").textContent = isOpen ? "+" : "−";
      button.firstChild.textContent = isOpen ? "Role & involvement " : "Hide details ";
    });
  });
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
  const revealItems = document.querySelectorAll(".section-heading, .project-card, .timeline-item, .detail-panel, .resume-card, .contact-grid > a");
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