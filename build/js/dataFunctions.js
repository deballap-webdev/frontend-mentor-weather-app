export const getCoordsFromApi = async (entryText) => {
  const text = cleanText(entryText);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${text}&count=4&format=json`;
  const encodedUrl = encodeURI(url);
  try {
    const coordsStream = await fetch(encodedUrl);
    const coordsJson = await coordsStream.json();
    console.log(coordsJson);
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
    `https://api.open-meteo.com/v1/forecast?latitude=${locationObj.lat}&longitude=${locationObj.lon}&wind_speed_unit=${locationObj.wind}&precipitation_unit=${locationObj.precipt}&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_min,temperature_2m_max&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&timezone=auto`,
  );
  const weatherJson = await weatherStream.json();
  return weatherJson;
};

export const setUnit = (event) => {
  console.log("hello");
  if (event.target.id) {
    let unitObj;
    if (event.target.id === "imperialBtn") {
      unitObj = {
        wind: "km/h",
        temp: "celsius",
        precipt: "mm",
      };
    } else if (event.target.id === "metricBtn") {
      unitObj = {
        wind: "mph",
        temp: "fahrenheit",
        precipt: "inch",
      };
    } else if (event.target.id === "km/hBtn") {
      unitObj = {
        wind: "km/h",
      };
    } else if (event.target.id === "mphBtn") {
      unitObj = {
        wind: "mph",
      };
    } else if (event.target.id === "inchBtn") {
      unitObj = {
        precipt: "inch",
      };
    } else if (event.target.id === "mmBtn") {
      unitObj = {
        precipt: "mm",
      };
    } else if (event.target.id === "°CBtn") {
      unitObj = {
        temp: "fahrenheit",
      };
    } else {
      unitObj = {
        temp: "celsuis",
      };
    }
    return unitObj;
  }
};
