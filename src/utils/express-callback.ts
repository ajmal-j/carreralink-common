import { Request, Response } from "express";
import { CustomResponseType } from "./express-response";
import { CustomError } from "../errorHandler";

export function expressCallback(controller: Function) {
  return async (req: Request, res: Response) => {
    try {
      const response = (await controller(req)) as CustomResponseType;
      res.status(response.statusCode).header(response.headers).json({
        success: true,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(`Error in Callback ${error}`);

      if (error instanceof CustomError) {
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
