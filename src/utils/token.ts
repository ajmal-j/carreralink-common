import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UnauthorizedError } from "../errorHandler";

const generateToken = (data: Object): string => {
  const secret = process.env.JWT_SECRET as string;

  if (!secret) throw new Error("JWT_SECRET is missing");
  return jwt.sign(data, secret, { expiresIn: "30d" });
};

const decodeToken = (token: string): Object => {
  const secret = process.env.JWT_SECRET as string;

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

export { generateToken, decodeToken };
