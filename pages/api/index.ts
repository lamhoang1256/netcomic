import { server } from "configs/server";
import { STATUS } from "constants/status";
import type { NextApiRequest, NextApiResponse } from "next";
import catchAsync from "utils/catchAsync";
import { ApiError, responseError } from "utils/response";

const NetComicApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  if (method !== "GET") {
    const error = new ApiError(STATUS.METHOD_NOT_ALLOWED, "Method not allowed");
    return responseError(error, res);
  }
  res
    .status(STATUS.OK)
    .json(`This is a NetComic api. Please check api document here: ${server}/api-doc`);
};

export default catchAsync(NetComicApi);
