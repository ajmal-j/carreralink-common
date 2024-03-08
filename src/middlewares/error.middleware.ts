import { Request, Response } from "express";
import { CustomError } from "../errorHandler";

export const errorMiddleware = (error: Error, req: Request, res: Response) => {
  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const message =
    error instanceof CustomError ? error.message : "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
};
