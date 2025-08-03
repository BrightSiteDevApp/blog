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

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElem(searchTogglers, "click", toggleSearchBar);

/**
 * Static content search functionality
 */
const searchInput = document.querySelector(".input-field");
const blogCards = document.querySelectorAll(".blog-card");
const searchMessage = document.querySelector(".search-bar-text");

// Create or get the "no results" message container (optional but useful)
let noResults = document.getElementById("no-results");
if (!noResults) {
  noResults = document.createElement("p");
  noResults.id = "no-results";
  noResults.textContent = "No matching articles found.";
  noResults.style.display = "none";
  noResults.style.textAlign = "center";
  noResults.style.marginTop = "1rem";
  const gridList = document.querySelector(".grid-list");
  gridList.parentNode.insertBefore(noResults, gridList.nextSibling);
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
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const summary = card.querySelector(".card-text").textContent.toLowerCase();

    if (title.includes(query) || summary.includes(query)) {
      card.style.display = "block";
      matchCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = matchCount === 0 ? "block" : "none";
});
