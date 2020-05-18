import Axios from "axios";

class WeatherApi {
  results = [];
  api = null;
  constructor() {
    this.api = Axios;
  }

  async getWeather(url) {
    const results = await Axios.get(url);
    this.results = results.data;
  }
}

export default WeatherApi;
