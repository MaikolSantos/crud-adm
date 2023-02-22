import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { IUserResult } from "../../interfaces/users";
import { client } from "../../database";
import { AppError } from "../../error";

const ensureUserExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryString: string = `
    SELECT * FROM users
    WHERE id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [request.params.id],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  if (!queryResult.rowCount) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default ensureUserExistsMiddleware;
