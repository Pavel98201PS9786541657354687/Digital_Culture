import axios from "axios";

// export const API_URL = "http://digitalkultura.ru:8001";
export const API_URL = "";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
