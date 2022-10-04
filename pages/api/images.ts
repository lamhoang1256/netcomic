import axios from "axios";
import { STATUS } from "constants/status";
import { NextApiHandler } from "next";
const URL_NETTRUYEN = process.env.URL_NETTRUYEN || "";

const handler: NextApiHandler = (req, res) => {
  if (!req.query.url) return res.status(STATUS.BAD_REQUEST).send("URL must not be empty");
  const url = (req.query.url as string).startsWith("//")
    ? (req.query.url as string).replace("//", "http://")
    : (req.query.url as string);
  axios
    .get(url, {
      responseType: "arraybuffer",
      headers: {
        referer: URL_NETTRUYEN,
      },
    })
    .then(({ data, headers: { "content-type": contentType } }) => {
      res
        .setHeader("cache-control", "max-age=99999")
        .setHeader("content-type", contentType)
        .send(data);
    });
};

export default handler;
