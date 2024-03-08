import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError } from "../errorHandler";

export const generateToken = (data: Object): string => {
  let secret = process.env.JWT_SECRET as string;
  if (!secret) throw new Error("JWT_SECRET is missing");
  return jwt.sign(data, secret);
};

export const decodeToken = (token: string): Object => {
  let secret = process.env.JWT_SECRET as string;
  if (!secret) throw new Error("JWT_SECRET is missing");
  try {
    const data = token.split(" ")[1];
    return jwt.verify(data, secret);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedError("Invalid Token");
    } else throw error;
  }
};
