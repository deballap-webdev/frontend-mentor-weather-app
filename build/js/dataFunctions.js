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
  console.log(name);
  return name;
};
