import { NextFunction, Request, Response } from "express";
import { AppError } from "../../error";

const ensureIsAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = request.user;

  if (!user.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureIsAdminMiddleware;
