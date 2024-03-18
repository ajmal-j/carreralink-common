import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError } from "../errorHandler";

export const generateToken = (data: Object, secret: string): string => {
  if (!secret) throw new Error("JWT_SECRET is missing");
  return jwt.sign(data, secret, { expiresIn: "30d" });
};

export const decodeToken = (token: string, secret: string): Object => {
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
