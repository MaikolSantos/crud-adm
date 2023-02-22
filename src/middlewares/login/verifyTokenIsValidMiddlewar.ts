import { Request, Response, NextFunction } from "express";
import { AppError } from "../../error";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyTokenIsValidMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  let token = request.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    request.user = {
      id: Number(decoded.sub),
      admin: decoded.admin,
    };

    return next();
  });
};

export default verifyTokenIsValidMiddleware;
