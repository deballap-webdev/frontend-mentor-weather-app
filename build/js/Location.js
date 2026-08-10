export default class Location {
  #lat;
  #lon;
  #name;
  #wind;
  #temp;
  #precipt;
  constructor() {
    this.#lat = null;
    this.#lon = null;
    this.#name = null;
    this.#wind = "mph";
    this.#temp = "fahrenheit";
    this.#precipt = "inch";
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

  getPrecipt() {
    return this.#precipt;
  }

  setLocation(locationObj) {
    const { lat, lon, name, wind, temp, precipt } = locationObj;
    if (lat) {
      this.#lat = lat;
    }
    if (lon) {
      this.#lon = lon;
    }
    if (name) {
      this.#name = name;
    }
    if (wind) {
      this.#wind = wind;
    }
    if (temp) {
      this.#temp = temp;
    }
    if (precipt) {
      this.#precipt = precipt;
    }
  }
}
