import { buildIcon, clearElem, createElem } from "./Utilities.js";

export const apiErrorDisplay = (text) => {
  const errorDisplay = document.getElementById("errorDisplay");
  const apiError = document.getElementById("apiError");

  errorDisplay.classList.remove("hidden");
  errorDisplay.classList.add("flex");
  /* clearElem(errorDisplay);
  const errorDivArray = createErrorDivs(text);
  errorDivArray.forEach((div) => errorDisplay.append(div)); */
};

/* const createErrorDivs = (text) => {
  const errorIcon = buildIcon("error", "svg", "18", "18");
  errorIcon.classList.add("w-8", "h-8");
  const errorHeading = createElem(
    [
      "text-3xl",
      "md:text-4xl",
      "lg:text-5xl",
      "font-HEADER-FONT",
      "font-semibold",
      "text-center",
    ],
    "Something went wrong",
  );

  const errorMsg = createElem(
    ["text-center"],
    `we couldn't connect to the server (${text}), Please try again in a few moments`,
  );

  const retryBtn = document.createElement('button')
  const retryBtnText = document.createTextNode = 'Retry'
  const retryIcon = buildIcon('retry', 'svg', '16', '17');
  return [errorIcon, errorHeading, errorMsg, retryBtn];
}; */
