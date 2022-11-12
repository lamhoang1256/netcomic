import axios from "axios";

const axiosNhattruyen = axios.create({
  baseURL: "https://nct.napdev.workers.dev/",
});

export default axiosNhattruyen;
