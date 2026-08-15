import { buildIcon, clearElem, createElem, show, hide } from "./Utilities.js";

export const apiErrorDisplay = (text) => {
  const errorDisplay = document.getElementById("errorDisplay");
  const mainApp = document.getElementById("mainApp");
  const apiError = document.getElementById("apiError");
  apiError.textContent = text;
  show(errorDisplay);
  hide(mainApp);
};

const retrySearch = () => {
  const errorDisplay = document.getElementById("errorDisplay");
  const mainApp = document.getElementById("mainApp");
  hide(errorDisplay);
  show(mainApp);
};

export const noMatchFound = () => {
  const forecastSection = document.getElementById("forecastSection");
  const noMatch = document.getElementById("noMatch");
  hide(forecastSection);
  show(noMatch);
};

export const toggleViewForResearch = () => {
  const forecastSection = document.getElementById("forecastSection");
  const noMatch = document.getElementById("noMatch");
  show(forecastSection);
  hide(noMatch);
};
