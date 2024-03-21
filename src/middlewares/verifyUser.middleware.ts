import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errorHandler";
import { decodeToken } from "../utils/token";

export const VerifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.cookies?.userToken || req?.headers?.authorization;
    if (!token) throw new NotFoundError("Token Not Found");

    const userData = await decodeToken(token as string);

    if (!userData) throw new NotFoundError("Invalid Token");

    (req as any).user = userData;

    next();
  } catch (error) {
    next(error);
  }
};
