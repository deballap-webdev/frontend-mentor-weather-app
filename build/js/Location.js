export default class Location {
  #lat;
  #lon;
  #name;
  #wind;
  #temp;
  #percipt;
  constructor() {
    this.#lat = null;
    this.#lon = null;
    this.#name = null;
    this.#wind = "mph";
    this.#temp = "fahrenheit";
    this.#percipt = "inches";
  }

  getLat() {
    return this.#lat;
  }

  getLon() {
    return this.#lon;
  }

  getName() {
    return this.#name;
  }

  getWind() {
    return this.#wind;
  }

  getTemp() {
    return this.#temp;
  }

  getPercipt() {
    return this.#percipt;
  }

  setLocation(locationObj) {
    const { lat, lon, name, wind, temp, percipt } = locationObj;
    this.#lat = lat;
    this.#lon = lon;
    this.#name = name;
    if (wind) {
      this.#wind = wind;
    }
    if (temp) {
      this.#temp = temp;
    }
    if (percipt) {
      this.#percipt = percipt;
    }
  }
}
