import { NextFunction, Request, Response } from "express";
import { AppError } from "../../error";

const ensureUpdateUserMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const user = request.user;
  const id = Number(request.params.id);

  if (!user.admin && user.id != id) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export default ensureUpdateUserMiddleware;
