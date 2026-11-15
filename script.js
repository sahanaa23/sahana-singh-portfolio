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

  // Project cards expand in place; other site sections retain their original behavior.
  const projectSection = document.querySelector("#projects");
  const projectGrid = projectSection?.querySelector(".project-grid");
  const projectDetail = document.querySelector("#project-detail");
  const projectBackdrop = document.querySelector("#project-backdrop");
  if (projectGrid && projectDetail && projectBackdrop) {
    const cards = Array.from(projectGrid.querySelectorAll(".project-card"));
    let activeCard = null;
    const notes = [
      {heading:"My contributions",body:"Contributed to the Friendly Fire trivia experience, including game-statistics question templates, data fixtures, and room-state functionality. The project combines multiple services to turn Valorant match data into personalized quizzes."},
      {heading:"Research and approach",body:"Exploring predictive models for sports outcomes and prediction markets, with attention to probability estimates, model evaluation, and quantitative analysis."},
      {heading:"Design and development",body:"Developing a wearable posture-monitoring prototype with a sensor and companion-app concept. The project focuses on calibration, posture detection, and useful feedback."},
      {heading:"My internship work",body:"During my summer 2024 internship at MNK Infotech, I developed Swift interface screens and functionality for the Asobo app, including input validation, calendar navigation, notifications, and quiz interfaces. I also tested and debugged app behavior."}
    ];
    function closeProject() {
      if (projectDetail.hidden) return;
      projectDetail.hidden = true;
      projectBackdrop.hidden = true;
      document.body.classList.remove("project-modal-open");
      projectDetail.replaceChildren();
      if (activeCard) activeCard.focus({preventScroll:true});
      activeCard = null;

    }
    cards.forEach((card,index) => {
      card.setAttribute("role","button");
      card.setAttribute("tabindex","0");
      card.setAttribute("aria-label","Explore "+card.querySelector("h3").textContent+" project");
      const open = () => {
        activeCard = card;
        const title = card.querySelector("h3").textContent;
        const type = card.querySelector(".project-type").textContent;
        const description = card.querySelector(".project-content > p:not(.project-type)").textContent;
        const tags = card.querySelector(".tag-list").cloneNode(true);
        const link = card.querySelector(".project-footer a");
        projectDetail.replaceChildren();
        const banner = document.createElement("div");
        banner.className = "project-detail-banner";
        const kicker = document.createElement("p");
        kicker.className = "eyebrow";
        kicker.textContent = type;
        const close = document.createElement("button");
        close.type = "button";
        close.className = "project-detail-close";
        close.textContent = "✕ Close";
        close.setAttribute("aria-label","Close project details");
        close.addEventListener("click",closeProject);
        banner.append(kicker,close);
        const body = document.createElement("div");
        body.className = "project-detail-body";
        const heading = document.createElement("h3");
        heading.id = "project-detail-title";
        heading.textContent = title;
        const intro = document.createElement("p");
        intro.textContent = description;
        const subheading = document.createElement("h4");
        subheading.textContent = notes[index].heading;
        const contribution = document.createElement("p");
        contribution.textContent = notes[index].body;
        const tools = document.createElement("h4");
        tools.textContent = "Tools & technologies";
        body.append(heading,intro,subheading,contribution,tools,tags);
        if (index === 3) {
          const impactHeading = document.createElement("h4");
          impactHeading.textContent = "From internship design to released app";
          const impact = document.createElement("div");
          impact.className = "project-detail-note";
          const impactText = document.createElement("p");
          impactText.textContent = "After my internship, I revisited the publicly released Asobo app and recognized interface layouts and design elements from my original work, with some visual changes. This project documents my contributions to that design and development process.";
          impact.append(impactText);
          body.append(impactHeading,impact);
        }
        if (link) {
          const footer = document.createElement("div");
          footer.className = "project-footer";
          const anchor = link.cloneNode(true);
          footer.append(anchor);
          body.append(footer);
        }
        const back = document.createElement("button");
        back.type = "button";
        back.className = "project-detail-close project-detail-bottom";
        back.textContent = "← Back to all projects";
        back.addEventListener("click",closeProject);
        body.append(back);
        projectDetail.append(banner,body);
        projectBackdrop.hidden = false;
        projectDetail.hidden = false;
        document.body.classList.add("project-modal-open");
        close.focus({preventScroll:true});
      };
      card.addEventListener("click",event => {
        if (event.target.closest("a")) return;
        open();
      });
      card.addEventListener("keydown",event => {
        if ((event.key === "Enter" || event.key === " ") && !event.target.closest("a")) {
          event.preventDefault();
          open();
        }
      });
    });
    projectBackdrop.addEventListener("click",closeProject);
    document.addEventListener("keydown",event => {
      if (projectDetail.hidden) return;
      if (event.key === "Escape") { closeProject(); return; }
      if (event.key !== "Tab") return;
      const focusable = Array.from(projectDetail.querySelectorAll("button, a[href], [tabindex]:not([tabindex=\"-1\"])")).filter(el => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length-1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
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