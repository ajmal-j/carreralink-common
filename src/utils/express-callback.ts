import { Request, Response } from "express";
import { CustomResponseType } from "./express-response";
import { CustomError } from "../errorHandler";
import { ZodError } from "zod";

export function expressCallback(controller: Function) {
  return async (req: Request, res: Response) => {
    try {
      const response = (await controller(req)) as CustomResponseType;
      if (response.cookie) {
        res.cookie(
          response.cookie.name,
          response.cookie.val,
          response.cookie.options
        );
      }
      res.status(response.statusCode).header(response.headers).json({
        success: true,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(`Error in Callback ${req.url} : ${error}`);

      if (error instanceof ZodError) {
        const validationErrors = error.issues.map((issue) => issue.message);
        res.status(422).json({
          success: false,
          message: "Validation Error",
          validationErrors,
        });
      } else if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    }
  };
}
