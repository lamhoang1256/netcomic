import axios from "axios";
import { PATH } from "constants/path";
import { STATUS } from "constants/status";
import { NextApiHandler } from "next";

const GetImageApi: NextApiHandler = (req, res) => {
  if (!req.query.url) return res.status(STATUS.BAD_REQUEST).send("URL must not be empty");
  const url = (req.query.url as string).startsWith("//")
    ? (req.query.url as string).replace("//", "http://")
    : (req.query.url as string);
  axios
    .get(url, {
      responseType: "arraybuffer",
      headers: {
        referer: PATH.nhatTruyen as string,
      },
    })
    .then(({ data, headers: { "content-type": contentType } }) => {
      res
        .setHeader("cache-control", "max-age=99999")
        .setHeader("content-type", contentType)
        .send(data);
    });
};

export default GetImageApi;
