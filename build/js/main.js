import {
  getCoordsFromApi,
  getNameFromApi,
  generateName,
  getWeatherFromApi,
  getUnits,
  getHourlyData,
} from "./dataFunctions.js";
import {
  dropDownDisplay,
  updateDisplay,
  switchUnitBtnDisplay,
} from "./domFunctions.js";
import Location from "./Location.js";

const currentLocation = new Location();
const initApp = () => {
  //Add Listeners
  const unitBtn = document.getElementById("toggleUnit");
  unitBtn.addEventListener("click", dropDownDisplay);
  unitBtn.addEventListener("focusout", dropDownDisplay);
  const dayButton = document.getElementById("chooseDay");
  dayButton.addEventListener("click", dropDownDisplay);
  dayButton.addEventListener("focusout", dropDownDisplay);
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", submitLocation);
  const unitsDropDown = document.getElementById("unitsDropDown");
  unitsDropDown.addEventListener("click", updateUnitAndDisplay);
  const daysDropDown = document.getElementById("daysDropDown");
  daysDropDown.addEventListener("click", handleHourlyData);

  loadThePage();
};

const loadThePage = async () => {
  await getGeolocation();
  console.log(currentLocation);
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
};

const geoError = (errMsg) => {};

const submitLocation = async (event) => {
  event.preventDefault();
  const searchText = event.currentTarget
    .querySelector("#searchInput")
    .value.trim();
  if (!searchText) return;
  const coordsJson = await getCoordsFromApi(searchText);
  if (coordsJson) {
    if (coordsJson.error) {
      updateDisplay(coordsJson.reason);
      return;
    }
    if (!coordsJson.results) {
      updateDisplay("No match found");
      return;
    }
    const coordsObj = {
      lat: coordsJson.results[0].latitude,
      lon: coordsJson.results[0].longitude,
      name: generateName(coordsJson.results[0]),
    };
    currentLocation.setLocation(coordsObj);
    updateDataAndDisplay();
  }
};

const updateUnitAndDisplay = (event) => {
  const unitObj = getUnits(event);
  if (!unitObj) return;
  currentLocation.setLocation(getUnits(event));
  switchUnitBtnDisplay(currentLocation);
  console.log(currentLocation);
};

const updateDataAndDisplay = async () => {
  const coordsObj = {
    lat: currentLocation.getLat(),
    lon: currentLocation.getLon(),
    wind: currentLocation.getWind(),
    precipt: currentLocation.getPrecipt(),
    temp: currentLocation.getTemp(),
  };
  const weatherJson = await getWeatherFromApi(coordsObj);
  updateDisplay(weatherJson);
};

const handleHourlyData = async (event) => {
  const locationObj = {
    lat: currentLocation.getLat(),
    lon: currentLocation.getLon(),
    name: currentLocation.getName(),
    wind: currentLocation.getWind(),
    temp: currentLocation.getTemp(),
    precipt: currentLocation.getPrecipt(),
  };
  const weatherJson = await getWeatherFromApi(locationObj);
  const hourlyJson = weatherJson.hourly;
  const hourlyData = getHourlyData(
    event.target.closest("button").dataset.day,
    hourlyJson,
  );

  updateDisplay(weatherJson, locationObj, hourlyData);
};
document.addEventListener("DOMContentLoaded", initApp);
