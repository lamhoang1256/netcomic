import axios from "axios";
import { PATH } from "constants/path";
import queryString from "query-string";

export const baseURL = `${PATH.netTruyen}/api`;

const axiosClient = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
    "User-Agent": "PostmanRuntime/7.29.2",
    Accept: "*/*",
    "Cache-Control": "no-cache",
    "Postman-Token": "70dda507-a90e-4da8-b7e1-6b33093676e9",
    Host: "www.nettruyenme.com",
    Connection: "keep-alive",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
