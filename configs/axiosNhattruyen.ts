import axios from "axios";
import queryString from "query-string";

const axiosNhattruyen = axios.create({
  baseURL: "https://nct.napdev.workers.dev/",
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosNhattruyen;
