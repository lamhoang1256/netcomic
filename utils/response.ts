import { STATUS } from "constants/status";
import { NextApiResponse } from "next";

export class ApiError extends Error {
  status: number;
  error?: string | any;
  constructor(status: number, message: string, error?: string | any) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

export const responseSuccess = (res: NextApiResponse, data: any) => {
  const status = data?.status || STATUS.OK;
  res.status(status).json({ status, success: true, ...data });
};

export const responseError = (err: ApiError, res: NextApiResponse) => {
  const status = err.status || STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Lỗi server!";
  const error = err.error;
  return res.status(status).json({
    status,
    success: false,
    message,
    error,
  });
};
