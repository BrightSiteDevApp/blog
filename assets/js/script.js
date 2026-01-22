'use strict';
/**
 * NAVBAR TOGGLE (DROPDOWN MODE)
 */
const navToggler = document.querySelector("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");

// Toggle Menu
navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active"); // Animates the hamburger
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll(".navbar-link");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    navToggler.classList.remove("active");
  });
});

/**
 * header sticky functionality
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 20
    ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * go top
 */
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  window.scrollY >= 800
    ? goTopBtn.classList.add("active")
    : goTopBtn.classList.remove("active");
});

/**
 * see more / see less toggle for long text
 */
function toggleText(el) {
  const shortText = el.parentElement.querySelector(".short-text");
  const fullText = el.parentElement.querySelector(".full-text");

  if (fullText.style.display === "none" || fullText.style.display === "") {
    fullText.style.display = "inline";
    shortText.style.display = "none";
    el.textContent = "See less...";
  } else {
    fullText.style.display = "none";
    shortText.style.display = "inline";
    el.textContent = "See more...";
  }
}
