import { getWeatherDetails } from "./dataFunctions.js";
import { clearElem, hide } from "./Utilities.js";
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

export const updateDisplay = (weatherJson, locationObj, hourlyJson, date) => {
  renderCurrentWeather(weatherJson, locationObj);
  renderCurrentDetails(weatherJson.current, locationObj);
  renderDailyWeather(weatherJson);
  renderHourlyWeather(hourlyJson);
  updateDescriptonText(weatherJson.current.weather_code);
  setFocusOnSearch();
};

const renderDailyWeather = (weatherJson) => {
  const dailyWeather = document.getElementById("dailyWeather");
  clearElem(dailyWeather);
  const dailyWeatherArray = createDailyDivs(weatherJson.daily);
  dailyWeatherArray.forEach((div) => {
    dailyWeather.append(div);
  });
};

const renderCurrentWeather = (weatherJson, locationObj) => {
  const currentWeather = document.getElementById("currentWeather");
  clearElem(currentWeather);
  const currentWeatherArray = createCurrentWeatherDivs(
    locationObj,
    weatherJson,
  );
  currentWeatherArray.forEach((div) => {
    currentWeather.append(div);
  });
};

const renderCurrentDetails = (currentJson, locationObj) => {
  const currentDetails = document.getElementById("currentWeather__details");
  clearElem(currentDetails);
  const currentDetailsArray = createCurrentDetailsDivs(
    locationObj,
    currentJson,
  );
  currentDetailsArray.forEach((div) => {
    currentDetails.append(div);
  });
};

export const renderHourlyWeather = (hourlyJson) => {
  const hourlyWeather = document.getElementById("hourlyWeather");
  clearElem(hourlyWeather);
  const hourlyWeatherArray = createHourlyDivs(hourlyJson);
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
