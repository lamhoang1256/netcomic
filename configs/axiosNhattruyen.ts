import axios from "axios";
import queryString from "query-string";

const BASE_URL_API = process.env.NEXT_PUBLIC_NHATTRUYEN as string;

const axiosNhattruyen = axios.create({
  baseURL: `https://corsproxy.io/?${encodeURIComponent(BASE_URL_API)}`,
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
