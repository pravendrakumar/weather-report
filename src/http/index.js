import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4201",
});

export default http;
