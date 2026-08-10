import {
  getCoordsFromApi,
  getNameFromApi,
  generateName,
} from "./dataFunctions.js";
import { dropDownDisplay } from "./domFunctions.js";
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
  getGeolocation();
};

const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  } else {
    return geoError();
  }
};

const geoSuccess = async (positionObj) => {
  const CoordsObj = {
    lat: positionObj.coords.latitude,
    lon: positionObj.coords.longitude,
    name: await getNameFromApi(
      positionObj.coords.latitude,
      positionObj.coords.longitude,
    ),
  };
  currentLocation.setLocation(CoordsObj);
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
      updateDisplay(coordsJson.error);
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
    updateDataAndDisplay(coordsObj);
    currentLocation.setLocation(coordsObj);
  }
};

const updateDataAndDisplay = (coordsObj) => {
  updateDisplay(coordsObj);
};

document.addEventListener("DOMContentLoaded", initApp);
