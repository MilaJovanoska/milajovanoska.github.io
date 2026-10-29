"use strict";

(() => {
  const data = window.portfolioData;
  const svgNamespace = "http://www.w3.org/2000/svg";

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function icon(name) {
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.classList.add("icon");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS(svgNamespace, "use");
    use.setAttribute("href", `#icon-${name}`);
    svg.append(use);
    return svg;
  }

  function publicLink(url, label, className) {
    const link = element("a", className, label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  for (const project of data.projects) {
    const card = element("article", "project-card");
    card.dataset.project = project.id;
    const headingId = `${project.id}-heading`;
    card.setAttribute("aria-labelledby", headingId);
    const image = element("img", "project-image");
    Object.assign(image, { src: project.image, alt: project.alt, width: project.width, height: project.height, loading: "lazy", decoding: "async" });
    const figure = element("div", "project-image-frame");
    figure.append(image);
    const body = element("div", "project-body");
    const heading = element("h4", "project-title", project.title);
    heading.id = headingId;
    body.append(heading);
    if (project.status === "In Progress" || project.status === "Submitted Coursework") body.append(element("p", "status-badge", project.status));
    const description = element("p", "project-description", project.description);
    if (project.description.includes("ROS 2")) {
      const [before, after] = project.description.split("ROS 2");
      description.replaceChildren(document.createTextNode(before + "ROS"), element("sup", null, "™"), document.createTextNode(" 2" + after));
    }
    body.append(description);
    const actions = element("div", "project-actions");
    if (project.publicUrl) {
      const link = publicLink(project.publicUrl, "Learn More", "button project-button");
      link.setAttribute("aria-label", `Learn more about ${project.title} (opens in a new tab)`);
      link.append(icon("arrow"));
      actions.append(link);
    }
    if (project.group === "previous" && project.status !== "Submitted Coursework") {
      const fullImage = publicLink(project.image, "View full image", "full-image-link");
      fullImage.setAttribute("aria-label", `View full image for ${project.title} (opens in a new tab)`);
      actions.append(fullImage);
    }
    if (actions.childElementCount) body.append(actions);
    card.append(figure, body);
    document.querySelector(project.group === "current" ? "#current-projects" : "#previous-projects").append(card);
  }

  for (const [name, filename, documentationUrl] of data.skills) {
    const tile = element("li", "skill-tile");
    const link = publicLink(documentationUrl, "", "skill-link");
    const reference = name === "SQL" ? "SQL reference, PostgreSQL dialect"
      : name === "C" || name === "C++" ? `${name} language reference` : `${name} documentation`;
    link.setAttribute("aria-label", `${reference} (opens in a new tab)`);
    const image = element("img", "skill-logo");
    Object.assign(image, { src: `assets/images/skills/${filename}${filename.includes(".") ? "" : ".svg"}`, alt: "", width: 64, height: 64, loading: "lazy", decoding: "async" });
    if (name === "ROS 2") {
      const mark = element("span", "skill-mark");
      const trademark = element("sup", null, "™");
      trademark.setAttribute("aria-hidden", "true");
      mark.append(image, trademark);
      link.append(mark, element("span", "skill-name", name));
    } else link.append(image, element("span", "skill-name", name));
    tile.append(link);
    document.querySelector("#skills-list").append(tile);
  }

  const contacts = [
    { name: "Email", cue: "Get in touch", url: `mailto:${data.contacts.email}`, icon: "mail" },
    { name: "LinkedIn", cue: "Connect professionally", url: data.contacts.linkedinUrl, image: "assets/images/skills/linkedin.svg" },
    { name: "GitHub", cue: "Explore my projects", url: data.contacts.githubUrl, image: "assets/images/skills/github.svg" }
  ];
  for (const contact of contacts) {
    const card = element(contact.url ? "a" : "div", "contact-card");
    if (contact.url) {
      card.href = contact.url;
      if (contact.url.startsWith("https:")) { card.target = "_blank"; card.rel = "noopener noreferrer"; }
    } else {
      card.classList.add("contact-pending");
    }
    const mark = element("span", `contact-icon${contact.icon ? " contact-mail" : ""}`);
    if (contact.icon) mark.append(icon(contact.icon));
    else {
      const image = element("img");
      Object.assign(image, { src: contact.image, alt: "", width: 56, height: 56, loading: "lazy" });
      mark.append(image);
    }
    const copy = element("div");
    copy.append(element("h3", null, contact.name), element("p", null, contact.cue));
    if (!contact.url) copy.append(element("span", "pending-note", "Link coming soon"));
    card.append(mark, copy);
    document.querySelector("#contact-cards").append(card);
  }

  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const mobile = window.matchMedia("(max-width: 1050px)");
  toggle.hidden = false;
  document.documentElement.classList.add("has-js");

  function closeMenu(restoreFocus = false) {
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
  });
  navigation.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link) return;
    closeMenu();
    const target = document.querySelector(link.getAttribute("href"));
    if (target && mobile.matches) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") closeMenu(true);
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  document.addEventListener("focusin", event => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  mobile.addEventListener("change", () => closeMenu());

  if ("IntersectionObserver" in window) {
    function markCurrent(id) {
      for (const link of navigation.querySelectorAll("a")) {
        if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
    const atPageEnd = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const observer = new IntersectionObserver(entries => {
      if (atPageEnd()) { markCurrent("contact"); return; }
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) markCurrent(visible.target.id);
    }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    document.querySelectorAll("main > section").forEach(section => observer.observe(section));
    // Short final sections may never reach the observer's activation band.
    window.addEventListener("scroll", () => {
      if (atPageEnd()) markCurrent("contact");
    }, { passive: true });
  }
})();
