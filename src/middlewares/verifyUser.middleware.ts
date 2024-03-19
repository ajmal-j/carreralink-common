import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errorHandler";
import { decodeToken } from "../utils/token";

export const VerifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization;
    const companyToken =
      req?.cookies?.companyToken || req?.headers?.companyToken;
    console.log(`

      --------------------------------------------------------





      ${(req.headers, companyToken)}
      
      --------------------------------------------------------
      
      ${req.cookies}
      
      
      
      
      
      
      
      --------------------------------------------------------`);
    if (!token && !companyToken) throw new NotFoundError("Token Not Found");

    const userData = await decodeToken(token as string);
    const companyData = await decodeToken(companyToken as string);

    if (!userData && !companyData) throw new NotFoundError("Invalid Token");

    (req as any).user = userData;
    (req as any).companyData = companyData;

    next();
  } catch (error) {
    next(error);
  }
};
