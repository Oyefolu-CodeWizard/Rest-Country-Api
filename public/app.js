"use strict";

// /////////////////////////////////////////////////////////////
const url = "https://restcountries.com/v3.1/all";
const theme = document.querySelector(".theme");
const light = document.querySelector(".dark");
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("#country-name");
const filterRegion = document.querySelector(".filter-region");

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

// Initial Theme Check
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
// moonIcon.addEventListener("click", function () {
//   themeSwitch();
//   lightMode();
// });
// sunIcon.addEventListener("click", function () {
//   themeSwitch();
//   darkMode();
// });

theme.addEventListener("click", function () {
  themeSwitch();
  if (moonIcon.classList.contains("display-none")) lightMode();
  if (sunIcon.classList.contains("display-none")) darkMode();
});

// Invoke theme check on initial load
// themeCheck();

//////////////////////////////////////////////////////////////////////////////
// Fetch Api request
const renderCountry = function (country) {
  const html = `
  <article class="w-64 h-[350px] bg-dmtlme  hover:scale-110 dark:bg-dme shadow-md rounded-lg">
    <img src="${country.flags.svg}" alt="${
    country.flags.alt
  }" class="w-64 h-40 object-cover bg-dmtlme dark:bg-dme rounded-tl-lg rounded-tr-lg">

    <div class="pl-6 pt-10 pb-2">
        <h3 class="mb-3 font-bold text-lmt dark:text-dmtlme">${
          country.name.common
        }</h3>
        <h4 class="mb-1 text-lmt font-semibold text-sm dark:text-dmtlme">Population: <span class="mr-8 font-normal">${new Intl.NumberFormat(
          navigator.language
        ).format(country.population)}</span</h4>
        <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Region: <span class="mr-8 font-normal">${
          country.region
        }</span></p>
        <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Capital: <span class="mr-8 font-normal">${
          country.capital
        }</span></p>
    </div>
  </article>
    `;
  cardContainer.insertAdjacentHTML("beforeend", html);
};

const throwError = function (res) {
  if (!res.ok)
    throw new Error(`Couldn't get countries.
      Try:
     1). Refreshing your browser.
     2). Make sure you are connected.
     3). Checking the proxy and the firewall
     4). If you are on PC, try Running Windows Network Diagnostics
      `);
};

const getAllCountries = async function () {
  try {
    const res = await fetch(url);

    throwError(res);

    const data = await res.json();

    data.map((el) => renderCountry(el));
  } catch (error) {
    alert(error);
  }
};

function clearCountries() {
  cardContainer.innerHTML = "";
}

const getSearchCountry = async function () {
  try {
    const res = await fetch(url);

    throwError(res);
    const data = await res.json();

    const inputValue = searchInput.value.trim().toLowerCase();

    // Check if search input is not empty
    if (inputValue !== "") {
      const userSearch = inputValue[0].toUpperCase() + inputValue.slice(1);
      const searchCountry = data.filter((con) =>
        con.name.common.includes(userSearch)
      );

      if (searchCountry.length > 0) {
        // Clear previous search results
        clearCountries();

        searchCountry.map((el) => renderCountry(el));
      } else {
        clearCountries();
      }
    } else {
      getAllCountries();
    }
  } catch (error) {
    alert(error);
  }
};

const filterByRegion = async function (e) {
  try {
    const filterValue = e.target.value;
    const res = await fetch(url);
    throwError(res);

    const data = await res.json();

    const filteredValue = data.filter(
      (el) => el.region.toLowerCase() === filterValue
    );

    // Clear the container before rendering new countries
    clearCountries();

    if (filteredValue.length > 0) {
      filteredValue.map((el) => renderCountry(el));
    } else {
      getAllCountries();
    }
  } catch (error) {
    alert(error);
  }
};

filterRegion.addEventListener("change", filterByRegion);
searchInput.addEventListener("input", getSearchCountry);

window.addEventListener("DOMContentLoaded", () => getAllCountries());
