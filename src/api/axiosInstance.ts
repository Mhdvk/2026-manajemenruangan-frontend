import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:5153/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMsg = "Unknown error";
    if (error.response) {
      errorMsg = JSON.stringify(error.response.data);
    } else if (error.request) {
      errorMsg = "No response from server (Network / CORS issue)";
    } else {
      errorMsg = error.message;
    }
    console.error("API Error:", errorMsg);
    return Promise.reject(error);
  }
);
