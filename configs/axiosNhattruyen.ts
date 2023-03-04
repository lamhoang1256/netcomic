import axios from "axios";
import queryString from "query-string";

const axiosNhattruyen = axios.create({
  baseURL: "https://corsproxy.io/?"
});

axiosNhattruyen.interceptors.request.use(
  async (config) => {
    if (!config.params) return { ...config, url: `?${config.url}` };
    const strParams = queryString.stringify(config.params);
    delete config.params;
    const customConfigs = { ...config, url: `?url=${config.url}?${strParams}` };
    return customConfigs;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosNhattruyen;
