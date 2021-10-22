import axios from "axios";

const BACKEND_HOST =
  process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";

export const backendApiClient = axios.create({
  baseURL: `${BACKEND_HOST}/api`,
  //   headers: { "X-Custom-Header": "foobar" },
});

