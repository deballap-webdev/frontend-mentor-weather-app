export const dropDownDisplay = (event) => {
  if (event.type === "click") {
    event.currentTarget
      .querySelector('img[data-dropDown="true"]')
      .classList.toggle("rotate-180");
    event.currentTarget.nextElementSibling.classList.toggle("hidden");
    event.currentTarget.nextElementSibling.classList.toggle("flex");
  } else {
    event.currentTarget
      .querySelector('img[data-dropDown="true"]')
      .classList.remove("rotate-180");
    hide(event.currentTarget.nextElementSibling);
  }
};

export const switchUnitBtnDisplay = (locationObj) => {
  const imperialBtn = document.getElementById("imperialBtn");
  const metricBtn = document.getElementById("metricBtn");
  if (
    locationObj.getWind() === "mph" &&
    locationObj.getTemp() === "fahrenheit" &&
    locationObj.getPrecipt() === "inch"
  ) {
    hide(imperialBtn);
    show(metricBtn);
  } else if (
    locationObj.getWind() === "mph" &&
    locationObj.getTemp() === "fahrenheit" &&
    locationObj.getPrecipt() === "inch"
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

export const updateDisplay = (displayData) => {};

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
    desc: weatherCodeLookup.weatherCode.desc,
    iconName: weatherCodeLookup.weatherCode.iconName,
  };
};
