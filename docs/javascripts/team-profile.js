(function () {
  /* =======================================================
     TEAM MEMBER DATA
     - Edit this object to update what appears in a member's
       profile panel. Everything else in this file is generic
       rendering/behavior and should not need to change.
     - Fields left as `null` render as a clearly-marked
       placeholder in the UI instead of being invented.
     ======================================================= */
  const MEMBERS = {
    shoug: {
      name: "Shoug Alomran",
      role: "Risk Alerts & Analysis Module Lead",
      department: "Software Engineering / Cybersecurity",
      affiliation: "Prince Sultan University",
      bio: null,
      contributions: [
        "Designed system architecture and UI wireframes; aligned interface with database operations.",
      ],
      responsibilities:
        "Risk rule logic, alert generation, aggregation, and data analysis.",
      links: {
        github: "https://github.com/Shoug-Alomran",
        linkedin: "https://linkedin.com/in/shoug-alomran",
        portfolio: "https://shoug-tech.com",
        email: "Shoug.Alomran@Shoug-Tech.com",
      },
    },
    yara: {
      name: "Yara Albugami",
      role: "Appointments, Clinics & Awareness Module Lead",
      department: "Software Engineering",
      affiliation: "Prince Sultan University",
      bio: null,
      contributions: [
        "Defined target users, usage scenarios, and system requirements.",
      ],
      responsibilities:
        "Clinic browsing, appointment scheduling, and awareness content management.",
      links: {
        github: "https://github.com/yaraf777",
        linkedin: "https://www.linkedin.com/in/yara-albugam",
        portfolio: null,
        email: null,
      },
    },
    rose: {
      name: "Rose AlRakan",
      role: "User & Access Control Module Lead",
      department: "Software Engineering",
      affiliation: "Prince Sultan University",
      bio: null,
      contributions: [
        "Defined core data requirements and supported documentation structure.",
      ],
      responsibilities:
        "Authentication mechanisms, role-based access control (RBAC), and audit logging.",
      links: {
        github: "https://github.com/rosealrakan",
        linkedin: "https://linkedin.com/in/rose-al-rakan",
        portfolio: null,
        email: null,
      },
    },
    raghad: {
      name: "Raghad Abdulaziz",
      role: "Family & Medical History Module Lead",
      department: null,
      affiliation: "Prince Sultan University",
      bio: null,
      contributions: [
        "Assisted with requirement refinement, system review, and documentation consistency.",
      ],
      responsibilities:
        "Family member relationships and structured medical history management.",
      links: { github: null, linkedin: null, portfolio: null, email: null },
    },
  };

  const PLACEHOLDER = "Not provided yet";
  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  let overlayEl = null;
  let lastTrigger = null;
  let keydownHandler = null;

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function keyFor(name) {
    return (name || "").trim().split(/\s+/)[0].toLowerCase();
  }

  function linkMeta(type) {
    switch (type) {
      case "github":
        return { label: "GitHub" };
      case "linkedin":
        return { label: "LinkedIn" };
      case "portfolio":
        return { label: "Portfolio" };
      case "email":
        return { label: "Email" };
      default:
        return { label: type };
    }
  }

  function hrefFor(type, value) {
    if (type === "email") return `mailto:${value}`;
    return value;
  }

  function buildOverlay() {
    if (overlayEl) return overlayEl;

    const overlay = document.createElement("div");
    overlay.className = "member-modal-overlay";

    overlay.innerHTML = `
      <div class="member-modal" role="dialog" aria-modal="true" aria-labelledby="member-modal-name" tabindex="-1">
        <button type="button" class="member-modal__close" aria-label="Close profile">
          <span aria-hidden="true">&times;</span>
        </button>
        <header class="member-modal__header">
          <div class="member-modal__avatar" aria-hidden="true"></div>
          <div class="member-modal__heading">
            <h2 class="member-modal__name" id="member-modal-name"></h2>
            <p class="member-modal__role"></p>
          </div>
        </header>

        <div class="member-modal__body">
          <dl class="member-modal__facts">
            <div class="member-modal__fact">
              <dt>Major / Department</dt>
              <dd class="member-modal__dept"></dd>
            </div>
            <div class="member-modal__fact">
              <dt>Affiliation</dt>
              <dd class="member-modal__affil"></dd>
            </div>
          </dl>

          <section class="member-modal__section">
            <h3>Biography</h3>
            <p class="member-modal__bio"></p>
          </section>

          <section class="member-modal__section">
            <h3>Project Contributions</h3>
            <ul class="member-modal__contributions"></ul>
          </section>

          <section class="member-modal__section">
            <h3>Responsibilities &amp; Deliverables</h3>
            <p class="member-modal__responsibilities"></p>
          </section>

          <section class="member-modal__section">
            <h3>Links</h3>
            <div class="member-modal__links"></div>
          </section>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlayEl = overlay;

    overlay.addEventListener("mousedown", (event) => {
      if (event.target === overlay) closeModal();
    });
    overlay
      .querySelector(".member-modal__close")
      .addEventListener("click", closeModal);

    return overlay;
  }

  function renderPlaceholder(el, value) {
    if (value) {
      el.textContent = value;
      el.classList.remove("is-placeholder");
    } else {
      el.textContent = PLACEHOLDER;
      el.classList.add("is-placeholder");
    }
  }

  function populate(data) {
    const dialog = overlayEl.querySelector(".member-modal");

    dialog.querySelector(".member-modal__avatar").textContent = data.name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    dialog.querySelector(".member-modal__name").textContent = data.name;
    renderPlaceholder(
      dialog.querySelector(".member-modal__role"),
      data.role
    );
    renderPlaceholder(
      dialog.querySelector(".member-modal__dept"),
      data.department
    );
    renderPlaceholder(
      dialog.querySelector(".member-modal__affil"),
      data.affiliation
    );
    renderPlaceholder(dialog.querySelector(".member-modal__bio"), data.bio);
    renderPlaceholder(
      dialog.querySelector(".member-modal__responsibilities"),
      data.responsibilities
    );

    const contribList = dialog.querySelector(".member-modal__contributions");
    contribList.innerHTML = "";
    if (data.contributions && data.contributions.length) {
      data.contributions.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        contribList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = PLACEHOLDER;
      li.classList.add("is-placeholder");
      contribList.appendChild(li);
    }

    const linksWrap = dialog.querySelector(".member-modal__links");
    linksWrap.innerHTML = "";
    const entries = Object.entries(data.links || {});
    const provided = entries.filter(([, value]) => value);

    if (provided.length) {
      provided.forEach(([type, value]) => {
        const a = document.createElement("a");
        a.className = "member-modal__link";
        a.href = hrefFor(type, value);
        a.textContent = linkMeta(type).label;
        if (type !== "email") {
          a.target = "_blank";
          a.rel = "noopener";
        }
        linksWrap.appendChild(a);
      });
    } else {
      const span = document.createElement("span");
      span.className = "member-modal__link is-placeholder";
      span.textContent = "No links provided yet";
      linksWrap.appendChild(span);
    }
  }

  function trapFocus(event) {
    const dialog = overlayEl.querySelector(".member-modal");
    const focusable = Array.from(
      dialog.querySelectorAll(FOCUSABLE_SELECTOR)
    ).filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    } else if (event.key === "Tab") {
      trapFocus(event);
    }
  }

  function openModal(key, trigger) {
    const data = MEMBERS[key];
    if (!data) return;

    buildOverlay();
    populate(data);

    lastTrigger = trigger || null;
    document.body.classList.add("member-modal-lock");
    overlayEl.classList.add("is-open");
    keydownHandler = onKeydown;
    document.addEventListener("keydown", keydownHandler, true);

    const focusTarget = overlayEl.querySelector(".member-modal");
    const raf = prefersReducedMotion()
      ? (fn) => fn()
      : requestAnimationFrame;
    raf(() => focusTarget.focus());
  }

  function closeModal() {
    if (!overlayEl || !overlayEl.classList.contains("is-open")) return;
    overlayEl.classList.remove("is-open");
    document.body.classList.remove("member-modal-lock");
    if (keydownHandler) {
      document.removeEventListener("keydown", keydownHandler, true);
      keydownHandler = null;
    }
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  function enhanceCards() {
    const cards = document.querySelectorAll(
      ".team-grid > ul > li, .team-grid ul > li"
    );

    cards.forEach((card) => {
      if (card.dataset.memberEnhanced) return;

      const strong = card.querySelector("strong");
      if (!strong) return;

      const key = keyFor(strong.textContent);
      if (!MEMBERS[key]) return;

      card.dataset.memberEnhanced = "true";
      card.dataset.member = key;
      card.classList.add("member-card");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute(
        "aria-label",
        `View full profile for ${MEMBERS[key].name}`
      );
      card.setAttribute("aria-haspopup", "dialog");

      card.addEventListener("click", () => openModal(key, card));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(key, card);
        }
      });
    });
  }

  function run() {
    enhanceCards();
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
