export const getCoordsFromApi = async (entryText) => {
  const text = cleanText(entryText);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=4&format=json`;
  const encodedUrl = encodeURI(url);
  try {
    const coordsStream = await fetch(encodedUrl);
    const coordsJson = await coordsStream.json();
    return coordsJson;
  } catch (err) {
    console.error(err.stack);
  }
};

const cleanText = (text) => {
  const regex = /( {2,})/g;
  return text.replaceAll(regex, " ").trim();
};

export const getNameFromApi = async (lat, lon) => {
  try {
    const nameStream = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=5`,
    );
    const nameJson = await nameStream.json();
    return nameJson.display_name;
  } catch (err) {
    console.error(err.stack);
  }
};

export const generateName = (result) => {
  let name = result.name;
  if (result.admin1 && name !== result.admin1) {
    name = `${result.name}, ${result.admin1}, ${result.country}, `;
  } else if (result.country && name !== result.country) {
    name = ` ${result.name}, ${result.country}`;
  }
  return name;
};

export const getWeatherFromApi = async (locationObj) => {
  const weatherStream = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${locationObj.getLat()}&longitude=${locationObj.getLon()}&wind_speed_unit=${locationObj.getWind()}&precipitation_unit=${locationObj.getPrecipt()}&temperature_unit=${locationObj.getTemp()}&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_min,temperature_2m_max&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`,
  );
  const weatherJson = await weatherStream.json();
  return weatherJson;
};

export const getUnits = (event) => {
  if (
    event.target.closest("button") &&
    event.target.closest("button").dataset.name
  ) {
    const unitLookUp = {
      metricBtn: {
        wind: "kmh",
        temp: "celsius",
        precipt: "mm",
      },
      imperialBtn: {
        wind: "mph",
        temp: "fahrenheit",
        precipt: "inch",
      },
      kmhBtn: {
        wind: "kmh",
      },
      mphBtn: {
        wind: "mph",
      },
      inchBtn: {
        precipt: "inch",
      },
      mmBtn: {
        precipt: "mm",
      },
      celsiusBtn: {
        temp: "celsius",
      },
      fahrenheitBtn: {
        temp: "fahrenheit",
      },
    };
    return unitLookUp[event.target.dataset.name];
  }
};

export const filterHourlyData = (day, hourlyJson) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayFilteredTime = hourlyJson.time.filter((date) => {
    return (
      new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      }) === day
    );
  });
  const hours = dayFilteredTime.map((date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    }),
  );
  const start = hourlyJson.time.indexOf(dayFilteredTime[0]);
  const end =
    hourlyJson.time.indexOf(dayFilteredTime[dayFilteredTime.length - 1]) + 1;
  if (days.indexOf(day) === -1) return;
  return {
    time: hours,
    temp: hourlyJson.temperature_2m.slice(start, end),
    code: hourlyJson.weather_code.slice(start, end),
  };
};

export const storeWeatherJson = (weatherJson) => {
  sessionStorage.setItem("myWeather", JSON.stringify(weatherJson));
};

export const getWeatherJson = () => {
  return sessionStorage.getItem("myWeather");
};

export const storeSessionDate = (date) => {
  sessionStorage.setItem("myDate", JSON.stringify(date));
};

export const getSessionDate = () => {
  return sessionStorage.getItem("myDate");
};

export const getWeatherDetails = (weatherCode) => {
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
