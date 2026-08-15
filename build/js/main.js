import {
  getCoordsFromApi,
  getNameFromApi,
  generateName,
  getWeatherFromApi,
  getUnits,
  filterHourlyData,
  storeWeatherJson,
  storeSessionDate,
  getSessionDate,
  getWeatherJson,
  convertBtwUnits,
} from "./dataFunctions.js";
import {
  dropDownDisplay,
  updateDisplay,
  renderHourlyWeather,
  errorDisplay,
} from "./domFunctions.js";
/* import {
  apiErrorDisplay,
  toggleViewForResearch,
  noMatchFound,
} from "./state.js"; */
import { switchDayBtnDisplay, switchUnitBtnDisplay } from "./sessionToggle.js";
import { hide, show } from "./Utilities.js";
import Location from "./Location.js";

const currentLocation = new Location();
const initApp = () => {
  //Add Listeners
  const retryBtn = document.getElementById("retry");
  const daysContainer = document.getElementById("daysContainer");
  const unitBtn = document.getElementById("toggleUnit");
  const unitContainer = document.getElementById("unitContainer");
  const dayButton = document.getElementById("chooseDay");
  const searchForm = document.getElementById("searchForm");
  const unitsDropDown = document.getElementById("unitsDropDown");
  const daysDropDown = document.getElementById("daysDropDown");
  unitBtn.addEventListener("click", dropDownDisplay);
  unitContainer.addEventListener("focusout", (event) => {
    dropDownDisplay(event, unitBtn);
  });
  dayButton.addEventListener("click", dropDownDisplay);
  daysContainer.addEventListener("focusout", (event) => {
    dropDownDisplay(event, dayButton);
  });
  searchForm.addEventListener("submit", submitLocation);
  unitsDropDown.addEventListener("click", updateUnitAndDisplay);
  daysDropDown.addEventListener("click", handleDayToggle);
  retryBtn.addEventListener("click", retrySearch);
  loadThePage();
};

const loadThePage = async (event) => {
  getGeolocation();
  const date = `${new Date().toLocaleDateString("en-US", {
    weekday: "long",
  })}`;
  switchDayBtnDisplay(date);
  switchUnitBtnDisplay(currentLocation);
};

const getGeolocation = async () => {
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    geoError();
  }
};

const geoSuccess = async (positionObj) => {
  const nameJson = await getNameFromApi(
    positionObj.coords.latitude,
    positionObj.coords.longitude,
  );
  if (handleError(nameJson)) return;
  const locationName = nameJson.display_name;
  const coordsObj = {
    lat: positionObj.coords.latitude,
    lon: positionObj.coords.longitude,
    name: locationName,
  };
  currentLocation.setLocation(coordsObj);
  sessionStorage.setItem("lastSearch", coordsObj);
  updateDataAndDisplay();
};

const geoError = (errObj) => {
  const errMsg = errObj ? errObj.message : "Geolocation not supported";
  const forecastSection = document.getElementById("forecastSection");
  const noMatch = document.getElementById("noMatch");
  noMatch.textContent = errMsg;
  hide(forecastSection);
  show(noMatch);
  document.querySelectorAll(".disabled").forEach((item) => {
    item.removeAttribute("disabled");
  });
  return;
};

const submitLocation = async (event) => {
  event.preventDefault();
  document.querySelectorAll(".disabled").forEach((item) => {
    item.setAttribute("disabled", "");
  });
  const searchText = event.currentTarget
    .querySelector("#searchInput")
    .value.trim();
  if (!searchText) return;
  sessionStorage.setItem("lastSearch", searchText);
  search(searchText);
};

const search = async (searchText) => {
  const searching = document.getElementById("searching");
  show(searching);
  const coordsJson = await getCoordsFromApi(searchText);
  if (handleError(coordsJson, "coordsApi")) {
    hide(searching);
    document.querySelectorAll(".disabled").forEach((item) => {
      item.removeAttribute("disabled");
    });
    return;
  }
  const coordsObj = {
    lat: coordsJson.results[0].latitude,
    lon: coordsJson.results[0].longitude,
    name: generateName(coordsJson.results[0]),
  };
  currentLocation.setLocation(coordsObj);
  sessionStorage.setItem("lastSearch", coordsObj);
  updateDataAndDisplay();
};

const handleError = (apiData, apiType) => {
  const forecastSection = document.getElementById("forecastSection");
  const noMatch = document.getElementById("noMatch");
  const searching = document.getElementById("searching");

  if (!apiData) {
    errorDisplay("No Internet Connection");
    return true;
  } else {
    if (apiData.error) {
      apiData.reason
        ? errorDisplay(apiData.reason)
        : errorDisplay(apiData.error);
      return true;
    } else if (!apiData.results && apiType === "coordsApi") {
      noMatch.textContent = "No search result found!";
      hide(forecastSection);
      show(noMatch);
      return true;
    } else {
      show(forecastSection);
      hide(noMatch);
    }
  }
  return false;
};

const retrySearch = () => {
  const lastSearch = sessionStorage.getItem("lastSearch");
  const errorDisplay = document.getElementById("errorDisplay");
  const mainApp = document.getElementById("mainApp");
  if (lastSearch) {
    if (typeof lastSearch === "object") {
      updateDataAndDisplay();
    } else if (typeof lastSearch === "string") {
      search(lastSearch);
    }
  }
  hide(errorDisplay);
  show(mainApp);
};

const updateUnitAndDisplay = (event) => {
  const unitObj = getUnits(event);
  if (!unitObj) return;
  currentLocation.setLocation(getUnits(event));
  switchUnitBtnDisplay(currentLocation);
  const weatherString = getWeatherJson();
  if (typeof weatherString !== "string") return;
  const weatherJson = JSON.parse(weatherString);
  const dateString = getSessionDate();
  const date =
    typeof dateString === "string"
      ? JSON.parse(dateString)
      : `${new Date().toLocaleDateString("en-US", {
          weekday: "long",
        })}`;
  const filteredHourlyData = filterHourlyData(date, weatherJson.hourly);
  const convertedValues = convertBtwUnits(currentLocation, date);
  updateDisplay(
    weatherJson,
    currentLocation,
    filteredHourlyData,
    convertedValues,
  );
};

const updateDataAndDisplay = async () => {
  const searching = document.getElementById("searching");
  const weatherJson = await getWeatherFromApi(currentLocation);
  if (handleError(weatherJson)) {
    hide(searching);
    document.querySelectorAll(".disabled").forEach((item) => {
      item.removeAttribute("disabled");
    });
    return;
  }
  storeWeatherJson(weatherJson);
  const date = `${new Date().toLocaleDateString("en-US", {
    weekday: "long",
  })}`;
  const convertedValues = convertBtwUnits(currentLocation, date);
  const filteredHourlyJson = filterHourlyData(date, weatherJson.hourly);
  updateDisplay(
    weatherJson,
    currentLocation,
    filteredHourlyJson,
    convertedValues,
  );
  hide(searching);
  document.querySelectorAll(".disabled").forEach((item) => {
    item.removeAttribute("disabled");
  });
};

const handleDayToggle = (event) => {
  if (!event.target.closest("button")) return;
  const weatherString = getWeatherJson();
  if (typeof weatherString !== "string") return;
  const weatherJson = JSON.parse(weatherString);
  const hourlyJson = weatherJson.hourly;
  const date = event.target.closest("button").dataset.day;
  const filteredHourlyJson = filterHourlyData(date, weatherJson.hourly);
  storeSessionDate(date);
  switchDayBtnDisplay(date);
  const convertedValues = convertBtwUnits(currentLocation, date);
  renderHourlyWeather(filteredHourlyJson, convertedValues.hourly);
};

document.addEventListener("DOMContentLoaded", initApp);
