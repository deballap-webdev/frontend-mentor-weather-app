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
    `https://api.open-meteo.com/v1/forecast?latitude=${locationObj.lat}&longitude=${locationObj.lon}&wind_speed_unit=${locationObj.wind}&precipitation_unit=${locationObj.precipt}&temperature_unit=${locationObj.temp}&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_min,temperature_2m_max&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto`,
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
      "km/hBtn": {
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
      "°CBtn": {
        temp: "celsius",
      },
      "°FBtn": {
        temp: "fahrenheit",
      },
    };
    return unitLookUp[event.target.dataset.name];
  }
};

export const getHourlyData = (day, houlyJson) => {
  console.log(houlyJson);
  const timeArray = houlyJson.time;
  const tempArray = houlyJson.temperature_2m;
  const codeArray = houlyJson.weather_code;
  const dayLookup = {
    monday: {
      time: timeArray.slice(0, 23),
      temp: tempArray.slice(0, 23),
      code: codeArray.slice(0, 23),
    },
    tuesday: {
      time: timeArray.slice(24, 47),
      temp: tempArray.slice(24, 47),
      code: codeArray.slice(24, 47),
    },
    wednesday: {
      time: timeArray.slice(48, 71),
      temp: tempArray.slice(48, 71),
      code: codeArray.slice(48, 71),
    },
    thursday: {
      time: timeArray.slice(72, 95),
      temp: tempArray.slice(72, 95),
      code: codeArray.slice(72, 95),
    },
    friday: {
      time: timeArray.slice(96, 119),
      temp: tempArray.slice(96, 119),
      code: codeArray.slice(96, 119),
    },
    saturday: {
      time: timeArray.slice(120, 143),
      temp: tempArray.slice(120, 143),
      code: codeArray.slice(120, 143),
    },
    sunday: {
      time: timeArray.slice(144, 167),
      temp: tempArray.slice(144, 167),
      code: codeArray.slice(144, 167),
    },
  };
  return dayLookup[day];
};
