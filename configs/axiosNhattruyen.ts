import axios from "axios";

const axiosNhattruyen = axios.create({
  baseURL: "https://nct.napdev.workers.dev/",
  headers: {
    Accept: "application/json",
  },
});

export default axiosNhattruyen;
