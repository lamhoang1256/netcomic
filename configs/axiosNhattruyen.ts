import axios from "axios";

const BASE_URL_API = process.env.NEXT_PUBLIC_NHATTRUYEN as string;

const axiosNhattruyen = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    Accept: "application/json",
  },
});

export default axiosNhattruyen;
