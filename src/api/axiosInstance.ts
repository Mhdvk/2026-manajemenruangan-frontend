import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:5153/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 5 detik timeout
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMsg = "Unknown error";
    if (error.response) {
      // server merespon error
      errorMsg = JSON.stringify(error.response.data);
    } else if (error.request) {
      // request dibuat tapi tidak ada response
      errorMsg = "No response from server (Network / CORS issue)";
    } else {
      // error lain
      errorMsg = error.message;
    }
    console.error("API Error:", errorMsg);
    return Promise.reject(error);
  }
);
