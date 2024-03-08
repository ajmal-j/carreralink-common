import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errorHandler";
import { decodeToken } from "../utils/token";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) throw new NotFoundError("Token Not Found");

    const userData = await decodeToken(token);

    if (!userData) throw new NotFoundError("Invalid Token");

    (req as any).user = userData;

    next();
  } catch (error) {
    next(error);
  }
};