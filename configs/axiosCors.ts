import axios from "axios";

const axiosCors = async (url: string) => {
  let isUseProxy = false;
  const response = await axios.get(url).catch(async () => {
    isUseProxy = true;
    const response = await axios.get(`https://corsproxy.io/?${url}`);
    return response;
  });
  return response;
};

export default axiosCors;
