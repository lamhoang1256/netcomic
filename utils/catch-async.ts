import { NextApiRequest, NextApiResponse } from "next";
import { responseError } from "./response";

const catchAsync =
  (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    Promise.resolve(handler(req, res)).catch((err) => {
      responseError(err, res);
    });
  };

export default catchAsync;
