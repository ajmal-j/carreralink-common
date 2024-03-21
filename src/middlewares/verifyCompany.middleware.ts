import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errorHandler";
import { decodeToken } from "../utils/token";

export const VerifyCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyToken =
      req?.cookies?.companyToken || req?.headers?.companytoken;

    if (!companyToken) throw new NotFoundError("Token Not Found");

    const companyData = await decodeToken(companyToken as string);

    if (!companyData) throw new NotFoundError("Invalid Token");

    (req as any).companyData = companyData;

    next();
  } catch (error) {
    next(error);
  }
};
