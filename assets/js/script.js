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

/**
 * Static content search functionality
 */
const blogCards = document.querySelectorAll(".blog-card");
const searchMessage = document.querySelector(".search-bar-text");

// Create or get the "no results" message
let noResults = document.getElementById("no-results");
if (!noResults) {
  noResults = document.createElement("p");
  noResults.id = "no-results";
  noResults.textContent = "No matching articles found.";
  noResults.style.display = "none";
  noResults.style.textAlign = "center";
  noResults.style.marginTop = "1rem";
  noResults.style.fontSize = "1.25rem"; // Makes the text bigger
  noResults.style.fontWeight = "600"; // Optional: make it bolder
  const gridList = document.querySelector(".grid-list");
  if (gridList && gridList.parentNode) {
    gridList.parentNode.insertBefore(noResults, gridList.nextSibling);
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  if (query.length < 3) {
    searchMessage.style.display = "block";
    blogCards.forEach((card) => (card.style.display = "block"));
    noResults.style.display = "none";
    return;
  } else {
    searchMessage.style.display = "none";
  }

  let matchCount = 0;

  blogCards.forEach((card) => {
    const titleEl = card.querySelector(".card-title");
    const textEl = card.querySelector(".card-text");

    const title = titleEl ? titleEl.textContent.toLowerCase() : "";
    const summary = textEl ? textEl.textContent.toLowerCase() : "";

    if (title.includes(query) || summary.includes(query)) {
      card.style.display = "block";
      matchCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = matchCount === 0 ? "block" : "none";
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission or reload
    searchInput.blur(); // Hide mobile keyboard

    // Optional: close search overlay
    searchBar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("active");
  }
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
