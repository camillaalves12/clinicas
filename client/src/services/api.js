import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3030",
});

api.defaults.headers.common["Cache-Control"] = "no-cache";
