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
} from "./dataFunctions.js";
import {
  dropDownDisplay,
  updateDisplay,
  renderHourlyWeather,
} from "./domFunctions.js";
import { apiErrorDisplay } from "./apiErrorFunctions.js";
import { switchDayBtnDisplay, switchUnitBtnDisplay } from "./sessionToogle.js";

import Location from "./Location.js";

const currentLocation = new Location();
const initApp = () => {
  //Add Listeners
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
    return geoError();
  }
};

const geoSuccess = async (positionObj) => {
  const coordsObj = {
    lat: positionObj.coords.latitude,
    lon: positionObj.coords.longitude,
    name: await getNameFromApi(
      positionObj.coords.latitude,
      positionObj.coords.longitude,
    ),
  };
  currentLocation.setLocation(coordsObj);
  updateDataAndDisplay();
};

const geoError = (errMsg) => {
  return "error";
};

const submitLocation = async (event) => {
  event.preventDefault();
  const searchText = event.currentTarget
    .querySelector("#searchInput")
    .value.trim();
  if (!searchText) return;
  const coordsJson = await getCoordsFromApi(searchText);
  if (handleError(coordsJson)) return;
  const coordsObj = {
    lat: coordsJson.results[0].latitude,
    lon: coordsJson.results[0].longitude,
    name: generateName(coordsJson.results[0]),
  };
  currentLocation.setLocation(coordsObj);
  updateDataAndDisplay();
};

const handleError = (apiData) => {
  if (!apiData) {
    apiErrorDisplay("Connection Error");
    if (apiData.error) {
      apiErrorDisplay(apiData.reason);
    } else if (!apiData.results) {
      apiErrorDisplay("No match found");
    }
    return true;
  }
  return false;
};

const updateUnitAndDisplay = (event) => {
  const unitObj = getUnits(event);
  if (!unitObj) return;
  currentLocation.setLocation(getUnits(event));
  //convertBtwUnits(currentLocation);
  switchUnitBtnDisplay(currentLocation);
  const dateString = getSessionDate();
  const date =
    typeof dateString === "string"
      ? JSON.parse(dateString)
      : `${new Date().toLocaleDateString("en-US", {
          weekday: "long",
        })}`;
};

const updateDataAndDisplay = async () => {
  const weatherJson = await getWeatherFromApi(currentLocation);
  const date = `${new Date().toLocaleDateString("en-US", {
    weekday: "long",
  })}`;
  const filteredHourlyJson = filterHourlyData(date, weatherJson.hourly);
  updateDisplay(weatherJson, currentLocation, filteredHourlyJson);
  storeWeatherJson(weatherJson);
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
  renderHourlyWeather(filteredHourlyJson);
};

document.addEventListener("DOMContentLoaded", initApp);
