import { getWeatherDetails } from "./dataFunctions.js";
import { clearElem, hide, show } from "./Utilities.js";
import {
  createCurrentDetailsDivs,
  createCurrentWeatherDivs,
  createHourlyDivs,
  createDailyDivs,
} from "./createCards.js";
export const dropDownDisplay = (event, elemToHide) => {
  if (event.type === "click") {
    event.currentTarget
      .querySelector('img[data-dropDown="true"]')
      .classList.toggle("rotate-180");
    event.currentTarget.nextElementSibling.classList.toggle("hidden");
    event.currentTarget.nextElementSibling.classList.toggle("flex");
    event.target.ariaExpanded =
      event.target.ariaExpanded === "true" ? "false" : "true";
  } else {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setTimeout(hideDropDown, 300, elemToHide);
  }
};

const hideDropDown = (elem) => {
  elem
    .querySelector('img[data-dropDown="true"]')
    .classList.remove("rotate-180");
  hide(elem.nextElementSibling);
  elem.ariaExpanded = "false";
};

export const updateDisplay = (
  weatherJson,
  locationObj,
  hourlyJson,
  convertedUnitsObj,
) => {
  renderCurrentWeather(weatherJson, locationObj, convertedUnitsObj.current);
  renderCurrentDetails(
    weatherJson.current,
    locationObj,
    convertedUnitsObj.current,
  );
  renderDailyWeather(weatherJson, convertedUnitsObj.daily);
  renderHourlyWeather(hourlyJson, convertedUnitsObj.hourly);
  updateDescriptonText(weatherJson.current.weather_code);
  setFocusOnSearch();
};

const renderDailyWeather = (weatherJson, dailyUnits) => {
  const dailyWeather = document.getElementById("dailyWeather");
  clearElem(dailyWeather);
  const dailyWeatherArray = createDailyDivs(weatherJson.daily, dailyUnits);
  dailyWeatherArray.forEach((div) => {
    dailyWeather.append(div);
  });
};

export const buildSuggestions = (suggestedLocations) => {
  const suggestionBox = document.getElementById("suggestionBox");
  clearElem(suggestionBox);
  suggestedLocations.forEach((location) => {
    const button = document.createElement("button");
    button.textContent = location;
    button.classList.add("searchSuggestion");
    suggestionBox.append(button);
  });
  show(suggestionBox);
};

export const errorDisplay = (text) => {
  const errorDisplay = document.getElementById("errorDisplay");
  const mainApp = document.getElementById("mainApp");
  const apiError = document.getElementById("apiError");
  apiError.textContent = text;
  show(errorDisplay);
  hide(mainApp);
};

const renderCurrentWeather = (weatherJson, locationObj, currentUnits) => {
  const currentWeather = document.getElementById("currentWeather");
  currentWeather.className =
    "p-4 h-71.5 mb-4 bg-blue-500 bg-[url(../images/bg-today-small.svg)] md:bg-[url(../images/bg-today-large.svg)] bg-center bg-cover bg-no-repeat flex flex-wrap justify-between items-center rounded-3xl md:max-w-200";
  clearElem(currentWeather);
  const currentWeatherArray = createCurrentWeatherDivs(
    locationObj,
    weatherJson,
    currentUnits,
  );
  currentWeatherArray.forEach((div) => {
    currentWeather.append(div);
  });
};

const renderCurrentDetails = (currentJson, locationObj, currentUnits) => {
  const currentDetails = document.getElementById("currentWeather__details");
  clearElem(currentDetails);
  const currentDetailsArray = createCurrentDetailsDivs(
    locationObj,
    currentJson,
    currentUnits,
  );
  currentDetailsArray.forEach((div) => {
    currentDetails.append(div);
  });
};

export const renderHourlyWeather = (hourlyJson, hourlyUnits) => {
  const hourlyWeather = document.getElementById("hourlyWeather");
  clearElem(hourlyWeather);
  const hourlyWeatherArray = createHourlyDivs(hourlyJson, hourlyUnits);
  hourlyWeatherArray.forEach((div) => {
    hourlyWeather.append(div);
  });
};

const updateDescriptonText = (weatherCode) => {
  const headerDesc = document.getElementById("headerDesc");
  headerDesc.textContent = getWeatherDetails(weatherCode).desc;
};

const setFocusOnSearch = () => {
  document.getElementById("searchInput").focus();
};
