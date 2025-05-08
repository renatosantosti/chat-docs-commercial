import axios from "axios";

const apiBaseUrl = window?.RUNTIME_ENV?.API_BASE_URL ?? "http://localhost:8000";

const http = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default http;
