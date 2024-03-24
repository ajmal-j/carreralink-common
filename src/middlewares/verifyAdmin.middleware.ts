import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errorHandler";
import { decodeToken } from "../utils/token";

export const VerifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminToken = req?.cookies?.adminToken || req?.headers?.admintoken;

    if (!adminToken) throw new NotFoundError("Token Not Found");

    const adminData = await decodeToken(adminToken as string);

    if (!adminData) throw new NotFoundError("Invalid Token");

    (req as any).adminData = adminData;

    next();
  } catch (error) {
    next(error);
  }
};
