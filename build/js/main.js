import { dropDownDisplay } from "./domFunctions.js";

const initApp = () => {
  //Add Listeners
  const unitBtn = document.getElementById("toggleUnit");
  unitBtn.addEventListener("click", dropDownDisplay);
  const dayButton = document.getElementById("chooseDay");
  dayButton.addEventListener("click", dropDownDisplay);
};

document.addEventListener("DOMContentLoaded", initApp);
