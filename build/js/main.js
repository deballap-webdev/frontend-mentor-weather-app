import {
  getCoordsFromApi,
  getNameFromApi,
  generateName,
  getWeatherFromApi,
  setUnit,
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
};

const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
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
  console.log("omor");
  currentLocation.setLocation(setUnit(event));
  switchUnitBtnDisplay(currentLocation);
  console.log(setUnit(event));
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

document.addEventListener("DOMContentLoaded", initApp);
