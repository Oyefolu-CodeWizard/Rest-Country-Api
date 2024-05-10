"use strict";

// Icons
const theme = document.querySelector(".theme");
const light = document.querySelector(".light");
const dark = document.querySelector(".darky");
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

// Theme Identifiers
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Icon Toggling
const iconToggle = function () {
  moonIcon.classList.toggle("display-none");
  sunIcon.classList.toggle("display-none");
};

// Switch mode text
function darkMode() {
  light.textContent = "Dark Mode";
}
function lightMode() {
  light.textContent = "Light Mode";
}

// Initial Theme Theck
const themeCheck = function () {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    sunIcon.classList.add("display-none");
    return;
  }
  moonIcon.classList.add("display-none");
};

// Manual Theme Switch
const themeSwitch = function () {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    iconToggle();
    return;
  }
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
  iconToggle();
};

// Call theme switch on click
moonIcon.addEventListener("click", function () {
  themeSwitch();
  lightMode();
});
sunIcon.addEventListener("click", function () {
  themeSwitch();
  darkMode();
});

// Invoke theme check on initial load
themeCheck();
