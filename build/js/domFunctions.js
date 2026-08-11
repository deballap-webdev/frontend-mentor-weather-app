export const dropDownDisplay = (event) => {
  if (event.type === "click") {
    event.currentTarget
      .querySelector('img[data-dropDown="true"]')
      .classList.toggle("rotate-180");
    event.currentTarget.nextElementSibling.classList.toggle("hidden");
    event.currentTarget.nextElementSibling.classList.toggle("flex");
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
  const imperialBtn = document.querySelector("[data-name='imperialBtn']");
  const metricBtn = document.querySelector("[data-name='metricBtn']");
  if (
    locationObj.getWind() === "mph" &&
    locationObj.getTemp() === "fahrenheit" &&
    locationObj.getPrecipt() === "inch"
  ) {
    hide(imperialBtn);
    show(metricBtn);
  } else if (
    locationObj.getWind() === "kmh" &&
    locationObj.getTemp() === "celsius" &&
    locationObj.getPrecipt() === "mm"
  ) {
    hide(metricBtn);
    show(imperialBtn);
  } else {
    show(metricBtn);
    show(imperialBtn);
  }
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
  const currentWeatherArray = createCurrentWeatherDivs(
    locationObj,
    weatherJson,
  );
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
    `${locationObj.name}`,
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
  console.log(name);
  const icon = buildIcon(weatherJson.current.weather_code, "100", "100");
  const temp = createElem(
    ["text-7xl", "italic", "font-semibold"],
    `${Math.round(weatherJson.current.temperature_2m)}°`,
  );
  iconTempContainer.append(icon, temp);

  return [nameDateContainer, iconTempContainer];
};

const buildIcon = (weatherCode, width, height) => {
  const img = document.createElement("img");
  const weatherDetails = getWeatherDetails(weatherCode);
  img.alt = weatherDetails.iconName + "icon";
  img.title = weatherDetails.iconName + "icon";
  img.width = width;
  img.height = height;
  return img;
};

const createElem = (classListArray, textContent) => {
  const div = document.createElement("div");
  classListArray.forEach((className) => {
    div.classList.add(className);
  });
  if (textContent) {
    div.textContent = textContent;
  }
  return div;
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
