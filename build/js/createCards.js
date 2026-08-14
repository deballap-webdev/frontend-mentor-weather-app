import { getWeatherDetails } from "./dataFunctions.js";
import { createCard, buildIcon, createElem } from "./Utilities.js";
export const createCurrentWeatherDivs = (
  locationObj,
  weatherJson,
  currentUnits,
) => {
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
  const iconName = getWeatherDetails(weatherJson.current.weather_code).iconName;
  const icon = buildIcon(iconName, "webp", "100", "100");
  const temp = createElem(
    ["text-7xl", "italic", "font-semibold"],
    `${Math.round(currentUnits.temp)}°`,
  );
  iconTempContainer.append(icon, temp);
  return [nameDateContainer, iconTempContainer];
};

export const createCurrentDetailsDivs = (
  locationObj,
  currentWeather,
  currentUnits,
) => {
  const windUnit = locationObj.getWind() === "mph" ? "mph" : "km/h";
  const precipitUnit = locationObj.getPrecipt() === "inch" ? "in" : "mm";
  const feels = createCard("current-card", [
    createElem([], "Feels Like"),
    createElem(["text-2xl"], `${Math.round(currentUnits.apparentTemp)}°`),
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
      `${Math.round(currentUnits.precipt)} ${precipitUnit}`,
    ),
  ]);
  const wind = createCard("current-card", [
    createElem([], "Wind"),
    createElem(["text-2xl"], `${Math.round(currentUnits.wind)} ${windUnit}`),
  ]);
  return [feels, humidity, wind, precipit];
};

export const createDailyDivs = (dailyJson, dailyUnits) => {
  const dailyDivArray = [];
  for (let i = 0; i <= 6; i++) {
    const day = createElem(
      [],
      `${new Date(dailyJson.time[i]).toLocaleDateString("en-US", {
        weekday: "short",
      })}`,
    );
    const iconName = getWeatherDetails(dailyJson.weather_code[i]).iconName;
    const icon = buildIcon(iconName, "webp");
    const tempCard = createCard("temp", [
      createElem([], `${Math.round(dailyUnits.maxTemp[i])}°`),
      createElem([], `${Math.round(dailyUnits.minTemp[i])}°`),
    ]);
    const dailyCard = createCard("daily-card", [day, icon, tempCard]);
    dailyDivArray.push(dailyCard);
  }
  return dailyDivArray;
};

export const createHourlyDivs = (hourlyJson, hourlyUnits) => {
  const hourlyDivArray = [];
  for (let i = 0; i <= 23; i++) {
    const iconName = getWeatherDetails(hourlyJson.code[i]).iconName;
    const icon = buildIcon(iconName, "webp");
    const time = createElem([], hourlyJson.time[i]);
    const iconTimeCard = createCard("icon-time", [icon, time]);
    const temp = createElem([], `${Math.round(hourlyUnits.temp[i])}°`);
    const hourlyCard = createCard("hourly-card", [iconTimeCard, temp]);
    hourlyDivArray.push(hourlyCard);
  }
  return hourlyDivArray;
};
