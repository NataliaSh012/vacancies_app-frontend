import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:5000/api/vacancies",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
