import { dropDownDisplay } from "./domFunctions.js";

const initApp = () => {
  //Add Listeners
  const unitBtn = document.getElementById("toggleUnit");
  unitBtn.addEventListener("click", dropDownDisplay);
  unitBtn.addEventListener("focusout", dropDownDisplay);
  const dayButton = document.getElementById("chooseDay");
  dayButton.addEventListener("click", dropDownDisplay);
  dayButton.addEventListener("focusout", dropDownDisplay);
};

document.addEventListener("DOMContentLoaded", initApp);
