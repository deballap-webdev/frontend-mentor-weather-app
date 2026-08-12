export const getCoordsFromApi = async (entryText) => {
  const text = cleanText(entryText);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=4&format=json`;
  const encodedUrl = encodeURI(url);
  try {
    const coordsStream = await fetch(encodedUrl);
    const coordsJson = await coordsStream.json();
    return coordsJson;
  } catch (err) {
    console.err(err.stack);
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

export const getHourlyData = (day, hourlyJson) => {
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
