import axios from "axios";

const BASE_URL_API = process.env.NEXT_PUBLIC_NHATTRUYEN as string;

const axiosNhattruyen = axios.create({
  baseURL: `https://corsproxy.io/?${encodeURIComponent(BASE_URL_API)}`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "User-Agent": "axios 0.21.1",
  },
});

// axiosNhattruyen.interceptors.request.use(
//   async (config) => {
//     console.log("config: ", config);
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export default axiosNhattruyen;
