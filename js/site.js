(() => {
  "use strict";
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value = "") => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
  const site = data.site;
  const page = document.body.dataset.page || "home";
  const titles = {
    home: "Home", about: "About", projects: "Projects", blog: "Field Notes",
    vlog: "Vlog", contact: "Contact", "project-detail": "Project", "article-detail": "Article"
  };
  document.title = `${titles[page] || "Portfolio"} | ${site.name}`;

  const navItems = [
    ["Home", "index.html", "home"], ["About", "about.html", "about"],
    ["Projects", "projects.html", "projects"], ["Blog", "blog.html", "blog"],
    ["Vlog", "vlog.html", "vlog"], ["Contact", "contact.html", "contact"]
  ];

  const header = $("#site-header");
  if (header) {
    header.innerHTML = `<header class="site-header"><div class="wrap nav-inner">
      <a class="brand" href="index.html" aria-label="${esc(site.name)} home">
        <span class="brand-mark">${esc(site.initials)}</span>
        <span class="brand-stack"><strong>${esc(site.name)}</strong><small>${esc(site.role)} · ${esc(site.organization)}</small></span>
      </a>
      <div class="nav-controls">
        <nav class="nav-links" aria-label="Main navigation">
          ${navItems.map(([label, href, key]) => `<a href="${href}" ${page === key || (page === "project-detail" && key === "projects") || (page === "article-detail" && key === "blog") ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
        </nav>
        <button class="theme-toggle" type="button" aria-label="Switch to light theme" title="Switch theme">◐</button>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">Menu ☰</button>
      </div>
    </div></header>`;

    const nav = $(".nav-links", header);
    nav.id = "primary-navigation";
    const menuButton = $(".menu-toggle", header);
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "Close ×" : "Menu ☰";
    });

    const themeButton = $(".theme-toggle", header);
    const setTheme = theme => {
      document.documentElement.dataset.theme = theme;
      const light = theme === "light";
      themeButton.textContent = light ? "☼" : "◐";
      themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      themeButton.title = light ? "Switch to dark theme" : "Switch to light theme";
      try { localStorage.setItem("tc-portfolio-theme", theme); } catch (_) {}
    };
    let savedTheme = "dark";
    try { savedTheme = localStorage.getItem("tc-portfolio-theme") || "dark"; } catch (_) {}
    setTheme(savedTheme === "light" ? "light" : "dark");
    themeButton.addEventListener("click", () => {
      setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
    });
  }

  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `<footer class="site-footer"><div class="wrap footer-inner">
      <a class="brand" href="index.html"><span class="brand-mark">${esc(site.initials)}</span><span class="brand-stack"><strong>${esc(site.name)}</strong><small>${esc(site.role)} · ${esc(site.organization)}</small></span></a>
      <span>© ${new Date().getFullYear()} ${esc(site.name)} · ${esc(site.role)}, ${esc(site.organization)}</span>
      <div class="footer-links">${site.socials.filter(s => s.url).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a>`).join("")}</div>
    </div></footer>`;
  }

  const projectCard = project => `<a class="project-card" href="project.html?id=${encodeURIComponent(project.id)}">
    <div class="card-top"><span class="tag">${esc(project.category)}</span><span class="status">${esc(project.status)}</span></div>
    <h3>${esc(project.title)}</h3><p>${esc(project.summary)}</p>
    <div class="project-areas">${(project.areas || []).slice(0, 3).map(area => `<span>${esc(area)}</span>`).join("")}</div>
    <span class="card-arrow">Explore case study ↗</span></a>`;

  const postCard = article => `<article class="post-card">
    <div class="post-meta"><span class="tag">${esc(article.category)}</span><span>${esc(article.date)}</span><span>${esc(article.readTime)}</span></div>
    <h3>${esc(article.title)}</h3><p>${esc(article.excerpt)}</p>
    <a href="article.html?id=${encodeURIComponent(article.id)}">Read field note →</a></article>`;

  const focusCard = (focus, index) => `<a class="focus-card" href="blog.html?category=${encodeURIComponent(focus.category)}">
    <span class="focus-number">${String(index + 1).padStart(2, "0")}</span>
    <span class="focus-card-title">${esc(focus.title)}</span>
    <span class="focus-card-description">${esc(focus.short)}</span>
    <span class="focus-card-link">Explore notes <span aria-hidden="true">↗</span></span>
  </a>`;

  const homeProjects = $("#home-projects");
  if (homeProjects) homeProjects.innerHTML = data.projects.filter(p => p.featured).slice(0, 3).map(projectCard).join("");
  const homePosts = $("#home-posts");
  if (homePosts) homePosts.innerHTML = data.articles.slice(0, 2).map(postCard).join("");
  const homeFocus = $("#home-focus");
  if (homeFocus) homeFocus.innerHTML = data.focusAreas.map(focusCard).join("");
  const aboutFocus = $("#about-focus");
  if (aboutFocus) aboutFocus.innerHTML = data.focusAreas.map(focusCard).join("");


  const educationList = $("#education-list");
  if (educationList) {
    educationList.innerHTML = (data.education || []).map(item => `<article class="education-card">
      <span class="timeline-mark">EDUCATION</span><div><h3>${esc(item.qualification)}</h3>
      ${item.institution ? `<p class="entry-org">${esc(item.institution)}</p>` : ""}
      ${item.period ? `<p class="entry-meta">${esc(item.period)}</p>` : ""}
      ${item.description ? `<p>${esc(item.description)}</p>` : ""}</div></article>`).join("");
  }

  const experienceList = $("#experience-list");
  if (experienceList) {
    experienceList.innerHTML = (data.experience || []).map(item => `<article class="experience-card">
      <div class="experience-marker" aria-hidden="true"></div>
      <div class="experience-body"><div class="experience-top"><div><h3>${esc(item.role)}</h3><p class="entry-org">${esc(item.organization)}</p></div><span class="experience-period">${esc(item.period)}</span></div>
      <p>${esc(item.description)}</p><span class="experience-type">${esc(item.type)}</span>
      ${item.responsibilities?.length ? `<details class="responsibilities-details"><summary>Key Responsibilities <span>View details</span></summary><ul>${item.responsibilities.map(task => `<li>${esc(task)}</li>`).join("")}</ul></details>` : ""}
      </div></article>`).join("");
  }

  const certificationsList = $("#certifications-list");
  if (certificationsList) {
    const groups = [...new Set((data.certifications || []).map(item => item.category))];
    certificationsList.innerHTML = groups.map((group, index) => {
      const items = data.certifications.filter(item => item.category === group);
      return `<details class="certification-group" ${index === 0 ? "open" : ""}>
        <summary><span>${esc(group)}</span><span class="cert-count">${items.length} ${items.length === 1 ? "certificate" : "certificates"}</span></summary>
        <div class="certification-items">${items.map(item => `<article class="certification-card"><div class="cert-mark" aria-hidden="true">✓</div><div><h3>${esc(item.title)}</h3><p>${esc(item.issuer)}</p></div><time>${esc(item.date)}</time></article>`).join("")}</div>
      </details>`;
    }).join("");
  }

  const skillsGrid = $("#skills-grid");
  if (skillsGrid) {
    const queryParams = new URLSearchParams(location.search);
    const categories = ["All", ...new Set((data.skills || []).map(skill => skill.category))];
    const requested = queryParams.get("skillCategory") || "All";
    let activeSkillCategory = categories.includes(requested) ? requested : "All";
    const filterHolder = $("#skills-filters");
    const drawSkillFilters = () => {
      filterHolder.innerHTML = categories.map(category => `<button type="button" class="chip ${category === activeSkillCategory ? "active" : ""}" data-skill-category="${esc(category)}">${esc(category)}</button>`).join("");
    };
    const drawSkills = () => {
      const matches = (data.skills || []).filter(skill => activeSkillCategory === "All" || skill.category === activeSkillCategory);
      skillsGrid.innerHTML = matches.map(skill => `<article class="skill-card"><div class="skill-icon">${esc(skill.name.slice(0, 2).toUpperCase())}</div><div><span class="skill-category">${esc(skill.category)}</span><h3>${esc(skill.name)}</h3><p>${esc(skill.note)}</p></div></article>`).join("");
      drawSkillFilters();
    };
    filterHolder.addEventListener("click", event => {
      const button = event.target.closest("button[data-skill-category]");
      if (!button) return;
      activeSkillCategory = button.dataset.skillCategory;
      drawSkills();
    });
    drawSkills();
  }

  function setFilters(holder, items, requestedCategory, onChange) {
    if (!holder) return "All";
    const categories = ["All", ...new Set(items.map(item => item.category))];
    const active = categories.includes(requestedCategory) ? requestedCategory : "All";
    holder.innerHTML = categories.map(category =>
      `<button type="button" class="chip ${category === active ? "active" : ""}" data-cat="${esc(category)}">${esc(category)}</button>`
    ).join("");
    holder.addEventListener("click", event => {
      const button = event.target.closest("button[data-cat]");
      if (!button) return;
      holder.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip === button));
      onChange(button.dataset.cat);
    });
    return active;
  }

  const projectList = $("#project-list");
  if (projectList) {
    const params = new URLSearchParams(location.search);
    let category = "All";
    const query = $("#project-search");
    const empty = $("#project-empty");
    category = setFilters($("#project-filters"), data.projects, params.get("category") || "All", value => {
      category = value; render();
    });
    const render = () => {
      const term = (query.value || "").trim().toLowerCase();
      const rows = data.projects.filter(project =>
        (category === "All" || project.category === category) &&
        [project.title, project.category, project.summary, project.status, ...(project.tools || []), ...(project.areas || [])].join(" ").toLowerCase().includes(term)
      );
      projectList.innerHTML = rows.map(projectCard).join("");
      empty.hidden = rows.length > 0;
    };
    query.addEventListener("input", render);
    render();
  }

  const blogList = $("#blog-list");
  if (blogList) {
    const params = new URLSearchParams(location.search);
    const query = $("#blog-search");
    const empty = $("#blog-empty");
    let category = setFilters($("#blog-filters"), data.articles, params.get("category") || "All", value => {
      category = value; render();
    });
    const render = () => {
      const term = (query.value || "").trim().toLowerCase();
      const rows = data.articles.filter(article =>
        (category === "All" || article.category === category) &&
        [article.title, article.category, article.date, article.excerpt,
          ...(article.sections || []).map(section => (section.heading || "") + " " + (section.paragraphs || []).join(" ") + " " + (section.bullets || []).join(" "))
        ].join(" ").toLowerCase().includes(term)
      );
      blogList.innerHTML = rows.map(postCard).join("");
      empty.hidden = rows.length > 0;
    };
    query.addEventListener("input", render);
    render();
  }

  function renderSections(sections, includeBullets = true) {
    return (sections || []).map(section => `<section><h2>${esc(section.heading)}</h2>
      ${(section.paragraphs || []).map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
      ${includeBullets && section.bullets ? `<ul>${section.bullets.map(item => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}
    </section>`).join("");
  }

  function renderReferences(references) {
    if (!Array.isArray(references) || !references.length) return "";
    return `<section class="article-references"><h2>References and Further Reading</h2><ol>${references.map(ref => {
      const safeUrl = /^https:\/\//i.test(ref.url || "") ? ref.url : "";
      return `<li>${esc(ref.label)}${safeUrl ? ` <a href="${esc(safeUrl)}" target="_blank" rel="noopener noreferrer">Read source ↗</a>` : ""}</li>`;
    }).join("")}</ol><p class="reference-note">Sources are provided for further reading. Consult the cited publication directly and check its version/date when applying guidance in practice.</p></section>`;
  }

  const projectDetail = $("#project-detail");
  if (projectDetail) {
    const id = new URLSearchParams(location.search).get("id");
    const project = data.projects.find(item => item.id === id);
    if (!project) {
      projectDetail.innerHTML = `<a class="back-link" href="projects.html">← All projects</a><h1>Project not found</h1><p>Choose a project from the directory.</p><a class="button primary" href="projects.html">Browse projects</a>`;
    } else {
      document.title = `${project.title} | ${site.name}`;
      projectDetail.innerHTML = `<a class="back-link" href="projects.html">← All projects</a>
        <header class="detail-header"><p class="eyebrow">${esc(project.category)} / ${esc(project.status)}</p><h1>${esc(project.title)}</h1>
        <p class="intro">${esc(project.summary)}</p><p class="post-meta">ROLE: ${esc(project.role)} · TOOLS: ${(project.tools || []).map(esc).join(" · ")}</p></header>
        <article class="detail-content">${renderSections(project.sections)}</article>
        <p class="note detail-note">Starter case study: add verified dates, screenshots, repository links and confirmed results before using this as formal portfolio evidence.</p>`;
    }
  }

  const articleDetail = $("#article-detail");
  if (articleDetail) {
    const id = new URLSearchParams(location.search).get("id");
    const article = data.articles.find(item => item.id === id);
    if (!article) {
      articleDetail.innerHTML = `<a class="back-link" href="blog.html">← Field notes</a><h1>Article not found</h1><p>Choose an article from the blog directory.</p><a class="button primary" href="blog.html">Browse field notes</a>`;
    } else {
      document.title = `${article.title} | ${site.name}`;
      articleDetail.innerHTML = `<a class="back-link" href="blog.html">← All field notes</a>
        <header class="detail-header"><p class="eyebrow">${esc(article.category)} / ${esc(article.date)}</p><h1>${esc(article.title)}</h1>
        <p class="intro">${esc(article.excerpt)}</p><p class="post-meta">${esc(article.readTime)} · LEARNING JOURNAL</p></header>
        <article class="detail-content">${renderSections(article.sections)}${renderReferences(article.references)}</article>
        <p class="note detail-note">Technical learning paper. Examples are educational; apply security testing only to systems you own or are explicitly authorized to assess. Review sources and update this paper as guidance evolves.</p>`;
    }
  }

  const vlogList = $("#vlog-list");
  if (vlogList) {
    const videos = data.videos.filter(video => video.videoId && !video.videoId.includes("VIDEO_ID"));
    vlogList.innerHTML = videos.length ? videos.map(video => `<article class="video-card">
      <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.videoId)}" title="${esc(video.title)}" loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <div><h3>${esc(video.title)}</h3><p>${esc(video.description || "")}</p></div></article>`).join("")
      : `<div class="video-empty"><p class="eyebrow">CHANNEL NOT CONNECTED YET</p><h3>Your first video can go here.</h3><p>Add a video title, description and YouTube video ID to the <code>videos</code> array in <code>js/data.js</code>. Video embeds need an internet connection.</p></div>`;
  }

  const contactLinks = $("#contact-links");
  if (contactLinks) {
    const validEmail = site.email && site.email.includes("@") && !site.email.includes("example.com");
    const contacts = [
      ...(validEmail ? [{ label: "Email", value: site.email, url: `mailto:${site.email}` }] : []),
      ...((site.phones || []).map((phone, index) => ({ label: index === 0 ? "Phone" : "Alternative phone", value: phone, url: `tel:${phone.replace(/[^+\d]/g, "")}` }))),
      ...(site.socials || []).filter(item => item.url && item.value && !item.value.startsWith("Add your")).map(item => ({ ...item }))
    ];
    contactLinks.innerHTML = contacts.map(item => {
      const content = `<span>${esc(item.label)}</span><a href="${esc(item.url)}" ${item.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${esc(item.value)} ↗</a>`;
      return `<div class="contact-item">${content}</div>`;
    }).join("");
  }
})();