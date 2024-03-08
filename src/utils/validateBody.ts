import { BadRequestError } from "../errorHandler";

export const validateBody = (body: Record<string, unknown>) => {
  for (const key in body) {
    if (!body[key]) {
      throw new BadRequestError(`'${key}' is required`);
    }
  }
};
