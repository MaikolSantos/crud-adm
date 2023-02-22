import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof z.ZodError) {
    return response.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }

  console.log(error);
  return response.status(500).json({ message: "Internal server error." });
};

export { AppError, errorHandler };
