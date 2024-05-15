"use strict";

// /////////////////////////////////////////////////////////////
const url = "https://restcountries.com/v3.1/all";
const theme = document.querySelector(".theme");
const light = document.querySelector(".dark");
const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");
const cardContainer = document.querySelector(".card-container");
const countryContainer = document.querySelector(".country-container");
const detailsContainer = document.querySelector(".details-container");
const searchInput = document.querySelector("#country-name");
const filterRegion = document.querySelector(".filter-region");
const searchFilter = document.querySelector(".search-filter");

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
  <article class="card">
    <img src="${country.flags.svg}" alt="${
    country.flags.alt
  }" class="w-64 h-40 object-cover bg-dmtlme dark:bg-dme rounded-tl-lg rounded-tr-lg">

    <div class="pl-6 pt-10 pb-2">
        <h3 class="name mb-3 font-bold text-lmt dark:text-dmtlme">${
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

const getNativeName = function (nativeName) {
  const [, , nat] = Object.entries(nativeName);
  const natOb = Object.entries(nat[1]);
  const nldA = natOb[0];
  const nld = nldA[1].common;
  return nld;
};

const getCurrency = function (currency) {
  const [name] = Object.values(currency);
  const cur = Object.values(name);
  const joinCur = cur.join(" ");
  return joinCur;
};

const getLanguages = function (currency) {
  const name = Object.values(currency);
  const joinName = name.join(", ");
  return joinName;
};

const getBorders = function (currency) {
  const border = currency
    .map(
      (bor) =>
        `<button class="shadow-md bg-dmtlme dark:bg-dme dark:text-dmtlme border-1 border-lmt rounded-sm p-10">${bor}</button>`
    )
    .join(" ");
  console.log(border);
  return border;
};

const renderDetails = function (detailsData) {
  const html = `
  <div class="w-[90%] relative">
  <button
    class="back flex justify-start rounded-md !p-10 bg-dmtlme dark:bg-dme dark:text-dmtlme shadow-md gap-2 font-nunit font-semibold"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5 mt-1 dark:text-dmtlme"
    >
      <path
        fill-rule="evenodd"
        d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
        clip-rule="evenodd"
      />
    </svg>

    Back
  </button>

  <div class="w-full flex justify-between relative top-20">
    <img src="${detailsData.flags.svg}" alt="${
    detailsData.flags.alt
  }" class="!w-[32rem] h-[350px] object-cover bg-dmtlme dark:bg-dme">
    <div class="pl-6 pt-10 pb-2">
      <div class="">
        <h3 class="font-bold text-2xl text-lmt dark:text-dmtlme">${
          detailsData.name.common
        }</h3>

        <div class="flex gap-x-16 relative top-10">
            <article class="">
                <h4 class="mb-1 text-lmt font-semibold text-sm dark:text-dmtlme">Native Name: <span class="mr-8 font-normal font-nunit">${
                  detailsData.name ? getNativeName(detailsData.name) : "None"
                }</span</h4>
                <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Population: <span class="mr-8 font-normal font-nunit">${new Intl.NumberFormat(
                  navigator.language
                ).format(detailsData.population)}</span></p>
                <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Region: <span class="mr-8 font-normal font-nunit">${
                  detailsData.region
                }</span></p>
                <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Sub Region: <span class="mr-8 font-normal font-nunit">${
                  detailsData.subregion
                }</span></p>
                <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Capital: <span class="mr-8 font-normal font-nunit">${
                  detailsData.capital[0]
                }</span></p>
            </article>

            <article class="">
                <h4 class="mb-1 text-lmt font-semibold text-sm dark:text-dmtlme">Top Level Domain: <span class="mr-8 font-normal font-nunit">${
                  detailsData.tld[0]
                }</span</h4>
                <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Currencies: <span class="mr-8 font-normal font-nunit">${
                  detailsData.currencies
                    ? getCurrency(detailsData.currencies)
                    : "None"
                }</span></p>
                <p class="mt-1 text-lmt font-semibold dark:text-dmtlme">Languages: <span class="mr-8 font-normal font-nunit">${
                  detailsData.languages
                    ? getLanguages(detailsData.languages)
                    : "None"
                }</span></p>
            </article>
        </div>

        <p class="relative top-20 text-lmt font-semibold text-sm dark:text-dmtlme">Border Countries: <button class="mr-8 font-normal font-nunit border-1 border-lmi">${
          detailsData.borders ? getBorders(detailsData.borders) : "None"
        }</button></p>
      </div>
      
    </div>
  </div>
</div>
  `;
  detailsContainer.insertAdjacentHTML("beforeend", html);
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
function clearDetails() {
  // Clear details and show country container and search filter
  detailsContainer.classList.add("display-none");
  countryContainer.classList.remove("display-none");
  searchFilter.classList.remove("display-none");
}

function setDetails() {
  detailsContainer.classList.remove("display-none");
  detailsContainer.innerHTML = "";
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
        // clearCountries();
        cardContainer.innerHTML = `<h6 class="text-lmi relative text-center font-nunit text-lg">No matching country found</h6>`;
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

// Details Section
cardContainer.addEventListener("click", function (e) {
  const card = e.target.closest(".card");

  if (card) {
    const countryNameElems = card.querySelector(".name");

    if (countryNameElems) {
      const countryName = countryNameElems.textContent;
      console.log(countryName);

      const fetchDetails = async function () {
        try {
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`
          );

          throwError(res);

          const [data] = await res.json();
          console.log(data);

          // Clear all countries container before rendering details
          countryContainer.classList.add("display-none");
          searchFilter.classList.add("display-none");

          if (data) {
            setDetails();
            renderDetails(data);

            const backBtn = document.querySelector(".back");
            backBtn.addEventListener("click", function () {
              // Clear details and show all countries
              clearDetails();
              getAllCountries();
            });
          } else {
            getAllCountries();
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchDetails();
    }
  }
});

filterRegion.addEventListener("change", filterByRegion);
searchInput.addEventListener("input", getSearchCountry);

window.addEventListener("DOMContentLoaded", () => getAllCountries());
