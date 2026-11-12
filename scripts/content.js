(function () {
  "use strict";

  const projectCarousel = document.getElementById("projectCarousel");
  const projectSlides = document.getElementById("projectSlides");
  const projectIndicators = document.getElementById("projectIndicators");
  const projectCount = document.getElementById("projectCount");
  const publicationList = document.getElementById("publicationList");
  const publicationCount = document.getElementById("publicationCount");
  const publicationError = document.getElementById("publicationError");
  const searchInput = document.getElementById("publicationSearch");
  const yearFilter = document.getElementById("publicationYear");
  const typeFilter = document.getElementById("publicationType");
  const tagFilter = document.getElementById("publicationTag");

  const textNode = (tag, className, value) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value;
    return element;
  };

  async function loadJson(path) {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return response.json();
  }

  function renderProjects(projects) {
    if (!projectCarousel || !projectSlides || !projectIndicators || !projects.length) return;
    projectSlides.replaceChildren();
    projectIndicators.replaceChildren();

    projects.forEach((project, index) => {
      const slide = document.createElement("div");
      slide.className = `carousel-item${index === 0 ? " active" : ""}`;
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", `${index + 1} of ${projects.length}: ${project.title}`);

      const panel = document.createElement("div");
      panel.className = "project-slide-panel";
      const row = document.createElement("div");
      row.className = "row g-0 h-100 align-items-stretch";

      const copyColumn = document.createElement("div");
      copyColumn.className = "col-md-7 d-flex align-items-center";
      const copy = document.createElement("div");
      copy.className = "project-slide-copy";
      copy.append(
        textNode("p", "project-slide-category", project.category),
        textNode("h3", "project-slide-title", project.title),
        textNode("p", "project-slide-summary", project.summary)
      );

      const tags = document.createElement("ul");
      tags.className = "project-tags";
      (project.tags || []).forEach((tag) => {
        tags.append(textNode("li", "badge bg-white text-dark border", tag));
      });
      copy.append(tags);

      const link = document.createElement("a");
      link.className = "btn btn-primary hover-effect";
      link.href = project.href || "#";
      link.textContent = project.linkLabel || "Explore project";
      if (/^https?:\/\//i.test(link.href)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      copy.append(link);
      copyColumn.append(copy);

      const artColumn = document.createElement("div");
      artColumn.className = "col-md-5";
      const art = document.createElement("div");
      art.className = `project-visual project-visual-${project.visualStyle || "default"}`;
      if (project.image) {
        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.imageAlt || project.title;
        image.loading = "lazy";
        art.append(image);
        art.classList.add("project-visual-with-image");
      } else {
        art.append(textNode("span", "project-visual-label", project.visualLabel || project.title));
      }
      artColumn.append(art);

      row.append(copyColumn, artColumn);
      panel.append(row);
      slide.append(panel);
      projectSlides.append(slide);

      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.setAttribute("data-bs-target", "#projectCarousel");
      indicator.setAttribute("data-bs-slide-to", String(index));
      indicator.setAttribute("aria-label", `Show ${project.title}`);
      indicator.setAttribute("aria-current", index === 0 ? "true" : "false");
      if (index === 0) indicator.className = "active";
      projectIndicators.append(indicator);
    });

    projectCount.textContent = `1 / ${projects.length}`;
    const instance = new bootstrap.Carousel(projectCarousel, {
      interval: false,
      ride: false,
      keyboard: true,
      touch: true,
      wrap: true
    });
    projectCarousel.addEventListener("slid.bs.carousel", (event) => {
      projectCount.textContent = `${event.to + 1} / ${projects.length}`;
      projectIndicators.querySelectorAll("[data-bs-slide-to]").forEach((button, buttonIndex) => {
        button.setAttribute("aria-current", buttonIndex === event.to ? "true" : "false");
      });
    });
    instance.pause();
  }

  function renderProjectCatalog(projects, catalogId = "projectCatalog") {
    const catalog = document.getElementById(catalogId);
    if (!catalog) return;
    catalog.replaceChildren();
    projects.forEach((project) => {
      const column = document.createElement("div");
      column.className = ["nonResearchCatalog", "homeNonResearchCatalog"].includes(catalogId) ? "col-lg-4 col-md-6" : "col-md-6";
      const card = document.createElement("article");
      card.className = "project-card h-100";
      card.id = project.id;
      const visual = document.createElement("div");
      visual.className = `project-card-visual project-visual-${project.visualStyle || "default"}`;
      if (project.image) {
        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.imageAlt || project.title;
        image.loading = "lazy";
        visual.append(image);
      } else {
        visual.append(textNode("span", "project-visual-label", project.visualLabel || project.title));
      }
      const body = document.createElement("div");
      body.className = "project-card-body";
      body.append(
        textNode("p", "project-slide-category", project.category),
        textNode("h2", "h4 project-slide-title", project.title),
        textNode("p", "project-slide-summary", project.summary)
      );
      const tags = document.createElement("ul");
      tags.className = "project-tags";
      (project.tags || []).forEach((tag) => tags.append(textNode("li", "badge bg-white text-dark border", tag)));
      body.append(tags);
      const link = document.createElement("a");
      link.className = "btn btn-outline-primary hover-effect";
      link.href = project.href || "#";
      link.textContent = project.linkLabel || "Explore project";
      if (/^https?:\/\//i.test(link.href)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      body.append(link);
      card.append(visual, body);
      column.append(card);
      catalog.append(column);
    });
  }

  let publications = [];

  function setOptions(select, values, firstLabel) {
    const initial = document.createElement("option");
    initial.value = "";
    initial.textContent = firstLabel;
    select.replaceChildren(initial);
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
  }

  function renderPublications() {
    if (!publicationList) return;
    const query = (searchInput.value || "").trim().toLowerCase();
    const chosenYear = yearFilter.value;
    const chosenType = typeFilter.value;
    const chosenTag = tagFilter.value;
    const visible = publications.filter((publication) => {
      const matchesQuery = !query || publication.citation.toLowerCase().includes(query) || (publication.tags || []).some((tag) => tag.toLowerCase().includes(query));
      const matchesYear = !chosenYear || String(publication.year) === chosenYear;
      const matchesType = !chosenType || publication.type === chosenType;
      const matchesTag = !chosenTag || (publication.tags || []).includes(chosenTag);
      return matchesQuery && matchesYear && matchesType && matchesTag;
    });

    visible.sort((a, b) => b.year - a.year || a.type.localeCompare(b.type) || a.citation.localeCompare(b.citation));
    publicationList.replaceChildren();
    publicationCount.textContent = `${visible.length} publication${visible.length === 1 ? "" : "s"}${visible.length !== publications.length ? ` of ${publications.length}` : ""}`;

    if (!visible.length) {
      publicationList.append(textNode("li", "publication-empty", "No publications match those filters."));
      return;
    }

    visible.forEach((publication) => {
      const item = document.createElement("li");
      item.className = "publication-entry";
      const row = document.createElement("div");
      row.className = "d-flex gap-3 align-items-start";
      row.append(textNode("span", "publication-year", String(publication.year)));

      const details = document.createElement("div");
      details.className = "flex-grow-1";
      details.append(textNode("p", "publication-citation", publication.citation));
      const meta = document.createElement("div");
      meta.className = "publication-meta";
      meta.append(textNode("span", "badge bg-light text-dark border", publication.type));
      (publication.tags || []).forEach((tag) => meta.append(textNode("span", "badge bg-white text-secondary border", tag)));
      details.append(meta);
      row.append(details);
      item.append(row);
      publicationList.append(item);
    });
  }

  async function initPublications() {
    if (!publicationList) return;
    try {
      const data = await loadJson("./data/publications.json");
      publications = Array.isArray(data.publications) ? data.publications : [];
      const initialQuery = new URLSearchParams(window.location.search).get("search");
      if (searchInput && initialQuery) searchInput.value = initialQuery;
      const years = [...new Set(publications.map((item) => String(item.year)))].sort((a, b) => Number(b) - Number(a));
      const types = [...new Set(publications.map((item) => item.type))].sort();
      const tags = [...new Set(publications.flatMap((item) => item.tags || []))].sort();
      setOptions(yearFilter, years, "All years");
      setOptions(typeFilter, types, "All publication types");
      setOptions(tagFilter, tags, "All topics");
      publicationError.classList.add("d-none");
      renderPublications();
    } catch (error) {
      publicationCount.textContent = "Publication data is temporarily unavailable.";
      publicationError.classList.remove("d-none");
      console.error(error);
    }
  }

  [searchInput, yearFilter, typeFilter, tagFilter].forEach((control) => {
    if (control) control.addEventListener(control === searchInput ? "input" : "change", renderPublications);
  });

  loadJson("./data/projects.json")
    .then((data) => {
      const projects = Array.isArray(data.projects) ? data.projects : [];
      renderProjects(projects);
      renderProjectCatalog(projects.filter((project) => project.projectType !== "non-research"));
      const nonResearchProjects = [
        ...(Array.isArray(data.nonResearchProjects) ? data.nonResearchProjects : []),
        ...projects.filter((project) => project.projectType === "non-research")
      ];
      renderProjectCatalog(nonResearchProjects, "nonResearchCatalog");
      renderProjectCatalog(nonResearchProjects, "homeNonResearchCatalog");
    })
    .catch((error) => {
      if (projectSlides) projectSlides.replaceChildren(textNode("div", "carousel-item active project-loading text-center p-5", "Project highlights are temporarily unavailable."));
      console.error(error);
    });

  initPublications();
})();
