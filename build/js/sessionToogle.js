import { hide, show } from "./Utilities";
export const switchUnitBtnDisplay = (locationObj) => {
  const signature = `${locationObj.getWind()}-${locationObj.getTemp()}-${locationObj.getPrecipt()}`;
  toggleBtnDisplay(signature);
  checkActiveUnits(signature);
};

export const switchDayBtnDisplay = (date) => {
  updateDayBtnText(date);
  checkActiveDay(date);
};

const toggleUnitBtnDisplay = (signature) => {
  const imperialBtn = document.querySelector("[data-name='imperialBtn']");
  const metricBtn = document.querySelector("[data-name='metricBtn']");
  const signatureLookUp = {
    "mph-fahrenheit-inch": () => {
      hide(imperialBtn);
      show(metricBtn);
    },
    "kmh-celsius-mm": () => {
      hide(metricBtn);
      show(imperialBtn);
    },
    default: () => {
      show(metricBtn);
      show(imperialBtn);
    },
  };
  const action = signatureLookUp[signature]
    ? signatureLookUp[signature]
    : signatureLookUp["default"];
  action();
};

const checkActiveUnits = (signature) => {
  const units = document.querySelectorAll(".unit");
  const nameArray = signature.split("-").map((sign) => {
    return sign + "Btn";
  });
  units.forEach((unit) => {
    if (nameArray.includes(unit.dataset.name)) {
      check(unit);
    } else {
      uncheck(unit);
    }
  });
};

const updateDayBtnText = (date) => {
  const day = document.getElementById("day");
  day.textContent = date;
};

const checkActiveDay = (day) => {
  const dayBtns = document.querySelectorAll(".day");
  dayBtns.forEach((btn) => {
    if (btn.dataset.day === day) {
      check(btn);
    } else {
      uncheck(btn);
    }
  });
};

const check = (elem) => {
  if (elem.querySelector(".checkMark")) return;
  const checkMark = buildIcon("checkmark", "svg", "14", "11");
  checkMark.className = "checkMark";
  elem.append(checkMark);
  elem.classList.add("bg-LIGHT-BGCOLOR");
};

const uncheck = (elem) => {
  if (elem.querySelector(".checkMark"))
    elem.querySelector(".checkMark").remove();
  elem.classList.remove("bg-LIGHT-BGCOLOR");
};
