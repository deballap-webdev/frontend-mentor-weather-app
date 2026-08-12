export const dropDownDisplay = (event) => {
  if (event.type === "click") {
    event.currentTarget
      .querySelector('img[data-dropDown="true"]')
      .classList.toggle("rotate-180");
    event.currentTarget.nextElementSibling.classList.toggle("hidden");
    event.currentTarget.nextElementSibling.classList.toggle("flex");
    event.target.ariaExpanded =
      event.target.ariaExpanded === "true" ? "false" : "true";
  } else {
    setTimeout(hideDropDown, 300, event);
  }
};

const hideDropDown = (event) => {
  event.target
    .querySelector('img[data-dropDown="true"]')
    .classList.remove("rotate-180");
  hide(event.target.nextElementSibling);
  event.target.ariaExpanded = "false";
};

export const switchUnitBtnDisplay = (locationObj) => {
  const signature = `${locationObj.getWind()}-${locationObj.getTemp()}-${locationObj.getPrecipt()}`;
  toggleBtnDisplay(signature);
  checkActiveUnits(signature);
};

const toggleBtnDisplay = (signature) => {
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
      if (unit.querySelector(".checkMark")) return;
      unit.append(buildCheckMark());
      unit.classList.add("bg-LIGHT-BGCOLOR");
    } else {
      if (unit.querySelector(".checkMark"))
        unit.querySelector(".checkMark").remove();
      unit.classList.remove("bg-LIGHT-BGCOLOR");
    }
  });
};

const buildCheckMark = () => {
  const checkMark = document.createElement("img");
  checkMark.src = "images/icon-checkmark.svg";
  checkMark.alt = "check mark";
  checkMark.className = "checkMark";
  checkMark.width = "14";
  checkMark.height = "11";
  return checkMark;
};

const hide = (elem) => {
  elem.classList.add("hidden");
  elem.classList.remove("flex");
};

const show = (elem) => {
  elem.classList.add("flex");
  elem.classList.remove("hidden");
};

export const updateDisplay = (weatherJson, locationObj, hourlyJson) => {
  const currentWeather = document.getElementById("currentWeather");
  const currentDetails = document.getElementById("currentWeather__details");
  const dailyWeather = document.getElementById("dailyWeather");
  const hourlyWeather = document.getElementById("hourlyWeather");

  clearElem([currentWeather, currentDetails, dailyWeather, hourlyWeather]);
  const currentWeatherArray = createCurrentWeatherDivs(
    locationObj,
    weatherJson,
  );
  const currentDetailsArray = createCurrentDetailsDivs(
    locationObj,
    weatherJson.current,
  );
  const dailyWeatherArray = createDailyDivs(weatherJson.daily);
  const hourlyWeatherArray = createHourlyDivs(hourlyJson);

  currentDetailsArray.forEach((div) => {
    currentDetails.append(div);
  });

  currentWeatherArray.forEach((div) => {
    currentWeather.append(div);
  });

  dailyWeatherArray.forEach((div) => {
    dailyWeather.append(div);
  });

  hourlyWeatherArray.forEach((div) => {
    hourlyWeather.append(div);
  });
  setFocusOnSearch();
};

const setFocusOnSearch = () => {
  document.getElementById("searchInput").focus();
};
const createCurrentWeatherDivs = (locationObj, weatherJson) => {
  const nameDateContainer = createElem([
    "text-center",
    "mx-auto",
    "md:text-left",
    "md:mx-0",
  ]);
  const name = createElem(
    ["font-bold", "text-3xl", "mb-4"],
    `${locationObj.getName()}`,
  );
  const date = createElem(
    [],
    `${new Date(weatherJson.daily.time[0]).toDateString()}`,
  );
  nameDateContainer.append(name, date);
  const iconTempContainer = createElem([
    "flex",
    "items-center",
    "justify-between",
    "w-full",
    "md:w-55",
    "mr-1",
  ]);
  const icon = buildIcon(weatherJson.current.weather_code, "100", "100");
  const temp = createElem(
    ["text-7xl", "italic", "font-semibold"],
    `${Math.round(weatherJson.current.temperature_2m)}°`,
  );
  iconTempContainer.append(icon, temp);
  return [nameDateContainer, iconTempContainer];
};

const createCurrentDetailsDivs = (locationObj, currentWeather) => {
  const windUnit = locationObj.getWind() === "mph" ? "mph" : "km/h";
  const precipitUnit = locationObj.getPrecipt() === "inch" ? "in" : "mm";
  const feels = createCard("current-card", [
    createElem([], "Feels Like"),
    createElem(
      ["text-2xl"],
      `${Math.round(currentWeather.apparent_temperature)}°`,
    ),
  ]);
  const humidity = createCard("current-card", [
    createElem([], "Humidity"),
    createElem(
      ["text-2xl"],
      `${Math.round(currentWeather.relative_humidity_2m)}%`,
    ),
  ]);
  const precipit = createCard("current-card", [
    createElem([], "precipitation"),
    createElem(
      ["text-2xl"],
      `${Math.round(currentWeather.precipitation)} ${precipitUnit}`,
    ),
  ]);
  const wind = createCard("current-card", [
    createElem([], "Wind"),
    createElem(
      ["text-2xl"],
      `${Math.round(currentWeather.wind_speed_10m)} ${windUnit}`,
    ),
  ]);

  return [feels, humidity, wind, precipit];
};

const createDailyDivs = (dailyJson) => {
  const dailyDivArray = [];
  for (let i = 0; i <= 6; i++) {
    const day = createElem(
      [],
      `${new Date(dailyJson.time[i]).toLocaleDateString("en-US", {
        weekday: "short",
      })}`,
    );
    const img = buildIcon(dailyJson.weather_code[i]);
    const tempCard = createCard("temp", [
      createElem([], `${Math.round(dailyJson.temperature_2m_max[i])}°`),
      createElem([], `${Math.round(dailyJson.temperature_2m_min[i])}°`),
    ]);
    const dailyCard = createCard("daily-card", [day, img, tempCard]);
    dailyDivArray.push(dailyCard);
  }
  return dailyDivArray;
};

const createHourlyDivs = (hourlyJson) => {
  const hourlyDivArray = [];
  for (let i = 0; i <= 23; i++) {
    const icon = buildIcon(hourlyJson.code[i]);
    const time = createElem([], hourlyJson.time[i]);
    const iconTimeCard = createCard("icon-time", [icon, time]);
    const temp = createElem([], `${Math.round(hourlyJson.temp[i])}°`);
    const hourlyCard = createCard("hourly-card", [iconTimeCard, temp]);
    hourlyDivArray.push(hourlyCard);
  }
  return hourlyDivArray;
};

const createCard = (cardClass, childrenArray) => {
  const cardContainer = createElem([cardClass]);
  childrenArray.forEach((child) => {
    cardContainer.append(child);
  });
  return cardContainer;
};

const buildIcon = (weatherCode, width, height) => {
  const img = document.createElement("img");
  const weatherDetails = getWeatherDetails(weatherCode);
  img.alt = weatherDetails.iconName + " icon";
  img.title = weatherDetails.iconName + " icon";
  if (width) img.width = width;
  if (height) img.height = height;
  img.src = `images/icon-${weatherDetails.iconName}.webp`;
  return img;
};

const createElem = (classListArray, textContent) => {
  const div = document.createElement("div");
  if (classListArray.length) {
    classListArray.forEach((className) => {
      div.classList.add(className);
    });
  }
  if (textContent) {
    div.textContent = textContent;
  }
  return div;
};

const clearElem = (elemArray) => {
  elemArray.forEach((elem) => {
    while (elem.lastElementChild) {
      elem.lastElementChild.remove();
    }
  });
};

const getWeatherDetails = (weatherCode) => {
  const weatherCodeLookup = {
    0: { desc: "Clear Sky", iconName: "sunny" },
    1: { desc: "Mainly Clear", iconName: "sunny" },
    2: { desc: "Partly Cloudy", iconName: "partly-cloudy" },
    3: { desc: "Overcast", iconName: "overcast" },
    45: { desc: "Fog", iconName: "fog" },
    48: { desc: "Depositing Rime Fog", iconName: "fog" },
    51: { desc: "Light Drizzle", iconName: "drizzle" },
    53: { desc: "Moderate Drizzle", iconName: "drizzle" },
    55: { desc: "Dense Drizzle", iconName: "drizzle" },
    56: { desc: "Light Freezing Drzzle", iconName: "drizzle" },
    57: { desc: "Dense Freezing Drizzle", iconName: "drizzle" },
    61: { desc: "Light Rain", iconName: "rain" },
    63: { desc: "Moderate Rain", iconName: "rain" },
    65: { desc: "Heavy Rain", iconName: "rain" },
    66: { desc: "Light Freezing Rain", iconName: "rain" },
    67: { desc: "Heavy Freezing Rain", iconName: "rain" },
    71: { desc: "Light Snow", iconName: "snow" },
    73: { desc: "Moderate Snow", iconName: "snow" },
    75: { desc: "Heavy Snow", iconName: "snow" },
    77: { desc: "Snow Grains", iconName: "snow" },
    80: { desc: "Light Rain Showers", iconName: "rain" },
    81: { desc: "Moderate Rain Showers", iconName: "rain" },
    82: { desc: "Voilent Rain Showers", iconName: "rain" },
    85: { desc: "Light Snow Showers", iconName: "snow" },
    86: { desc: "Heavy Snow Showers", iconName: "snow" },
    95: { desc: "Thunderstorm", iconName: "storm" },
    96: { desc: "Thunderstorm with Slight Hail", iconName: "snow" },
    99: { desc: "Thunderstorm with Heavy Hail", iconName: "snow" },
  };

  return {
    desc: weatherCodeLookup[weatherCode].desc,
    iconName: weatherCodeLookup[weatherCode].iconName,
  };
};
