//the data needed
const articles = [
  {
    title: "Understanding the difference between grid-template and grid-auto",
    date: "Oct 09, 2018",
    content:
      "With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template- and grid-auto- properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns."
  },
  {
    title: "Recreating the GitHub Contribution Graph with CSS Grid Layout",
    date: "Dec 12, 2019",
    content:
      "This post shows how to rebuild GitHub's contributions heatmap using modern CSS Grid. We'll step through the grid track sizing, gap, and auto-placement to achieve the iconic calendar layout."
  },
  {
    title: "A Gentle Introduction to Flexbox",
    date: "Mar 05, 2020",
    content:
      "Flexbox is a one-dimensional layout method for arranging items in rows or columns. Learn the main axis, cross axis, and powerful alignment properties."
  },
  {
    title: "CSS Grid: Auto-placement vs Explicit Placement",
    date: "Aug 22, 2021",
    content:
      "Understanding how the auto-placement algorithm works in CSS Grid can save you time. We'll compare explicit named areas to automatic flow and discuss when to choose each."
  },
  {
    title: "Building Accessible Search UI Components",
    date: "Jan 03, 2022",
    content:
      "From ARIA attributes to keyboard navigation and focus management, this guide covers the essentials for creating accessible search boxes and result lists."
  },
  {
    title: "React + TypeScript: Patterns for Reusable Components",
    date: "May 11, 2022",
    content:
      "We cover discriminated unions, generic props, and composition patterns for scalable component libraries."
  },
  {
    title: "Vue 3 Composition API Cheat Sheet",
    date: "Jul 17, 2022",
    content:
      "A handy reference for refs, computed, watch, provide/inject, and the lifecycle hooks in Vue 3."
  },
  {
    title: "Tailwind CSS Tips for Real Projects",
    date: "Oct 02, 2023",
    content:
      "Utility-first styling can get messy. Here are conventions to keep your Tailwind classes maintainable."
  },
  {
    title: "Grid Layout Cookbook: 12 Patterns",
    date: "Mar 29, 2024",
    content:
      "Gallery, Masonry-ish, Dashboard, Magazine — practical grid patterns with annotated code."
  },
  {
    title: "From Float Layouts to Modern CSS",
    date: "Jun 10, 2024",
    content:
      "A historical tour: floats, inline-blocks, tables, Flexbox, and Grid — why Grid finally clicks."
  }
];

//the dom
const qEl = document.getElementById("q");
const resultsEl = document.getElementById("results");
const countEl = document.getElementById("count");

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlight(text, query) {
  if (!query) return text;
  return text.replace(new RegExp(escapeRegex(query), "gi"), m => `<mark>${m}</mark>`);
}

//render
function render(query = "") {
  const q = query.trim();
  if (!q) {
    resultsEl.innerHTML = "";
    countEl.textContent = "Start typing to search…";
    return;
  }

  const hits = articles.filter(a =>
    (a.title + " " + a.content).toLowerCase().includes(q.toLowerCase())
  );

  countEl.textContent = hits.length === 1 ? "1 post was found." : `${hits.length} posts were found.`;

  if (!hits.length) {
    resultsEl.innerHTML = `<div class="empty">No results for “${q}”.</div>`;
    return;
  }

  resultsEl.innerHTML = hits.map(({ title, date, content }) => `
    <article class="card">
      <h2>${highlight(title, q)}</h2>
      ${date ? `<div class="date">${date}</div>` : ""}
      <p class="excerpt">
        ${highlight(content.slice(0, 200) + (content.length > 200 ? "…" : ""), q)}
      </p>
    </article>
  `).join("");
}

//event listener
qEl.addEventListener("input", e => render(e.target.value));
