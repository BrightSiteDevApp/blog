"use strict";

/**
 * Add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Search bar toggle
 */
const searchBar = document.querySelector("[data-search-bar]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const overlay = document.querySelector("[data-overlay]");
const searchInput = document.querySelector(".input-field");

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");

  // Delay focus until animation finishes
  if (searchBar.classList.contains("active")) {
    setTimeout(() => {
      searchInput.value = ""; // Clear previous search
      searchInput.focus(); // Auto-focus for typing
    }, 300); // Match your transition speed
  }
};

addEventOnElem(searchTogglers, "click", toggleSearchBar);

document.addEventListener("DOMContentLoaded", function () {
  const blogItems = document.querySelectorAll(".blog-item");
  const searchInput = document.querySelector(".input-field");
  const searchMessage = document.querySelector(".search-bar-text");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const resetSearchBtn = document.getElementById("resetSearchBtn");
  const searchBar = document.querySelector("[data-search-bar]");
  const overlay = document.querySelector("[data-overlay]");
  const noResults = document.getElementById("no-results");

  const initialVisibleCount = 3;

  function showInitialArticles() {
    blogItems.forEach((item, index) => {
      if (index < initialVisibleCount) {
        item.classList.remove("hidden");
        item.style.display = "block";
      } else {
        item.classList.add("hidden");
        item.style.display = "none";
      }
    });
    loadMoreBtn.style.display =
      blogItems.length > initialVisibleCount ? "block" : "none";
  }

  function showAllArticles() {
    blogItems.forEach((item) => {
      item.classList.remove("hidden");
      item.style.display = "block";
    });
    loadMoreBtn.style.display = "none";
  }

  function resetArticlesView() {
    showInitialArticles();
    resetSearchBtn.style.display = "none";
    noResults.style.display = "none";
    searchMessage.style.display = "block";
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    if (query.length < 3) {
      resetArticlesView();
      return;
    }

    loadMoreBtn.style.display = "none";
    resetSearchBtn.style.display = "inline-block";
    searchMessage.style.display = "none";

    let matchCount = 0;

    blogItems.forEach((item) => {
      const card = item.querySelector(".blog-card");
      const titleEl = card.querySelector(".card-title");
      const textEl = card.querySelector(".card-text");

      const title = titleEl ? titleEl.textContent.toLowerCase() : "";
      const summary = textEl ? textEl.textContent.toLowerCase() : "";

      if (title.includes(query) || summary.includes(query)) {
        item.style.display = "block";
        item.classList.remove("hidden");
        matchCount++;
      } else {
        item.style.display = "none";
      }
    });

    noResults.style.display = matchCount === 0 ? "block" : "none";
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchInput.blur();

      if (searchBar) searchBar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      document.body.classList.remove("active");
    }
  });

  resetSearchBtn.addEventListener("click", function () {
    searchInput.value = "";
    resetArticlesView();
  });

  loadMoreBtn.addEventListener("click", function () {
    showAllArticles();
  });

  // 🔁 On load, show only first 3
  showInitialArticles();
});

// scroll to top

function scrollAndReload() {
  // Smoothly scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Listen for scroll end using a timer that stops updating once scrolling is done
  let lastPosition = -1;
  let checkScroll = setInterval(() => {
    const current = window.scrollY;
    if (current === 0 || current === lastPosition) {
      clearInterval(checkScroll);
      location.reload(); // Reload once at top
    }
    lastPosition = current;
  }, 50); // Checks every 50ms
}

// recent nav scroll
function scrollToRecentPosts() {
  const section = document.getElementById("recent");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    // Clean the URL to remove the hash
    if (history.pushState) {
      history.pushState(null, null, window.location.pathname);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  loadMoreBtn.addEventListener("click", function () {
    const hiddenItems = document.querySelectorAll(".blog-item.hidden");
    const itemsToShow = Array.from(hiddenItems).slice(0, 3); // load 3 only

    itemsToShow.forEach((item) => item.classList.remove("hidden"));

    if (document.querySelectorAll(".blog-item.hidden").length === 0) {
      loadMoreBtn.style.display = "none";
    }
  });
});
