import axios from "axios";
import queryString from "query-string";
import { server } from "./server";

const axiosClient = axios.create({
  baseURL: server,
  paramsSerializer: (params) => queryString.stringify(params)
});

export default axiosClient;
