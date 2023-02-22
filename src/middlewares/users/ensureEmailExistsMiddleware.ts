import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { IUserResult } from "../../interfaces/users";
import { client } from "../../database";
import { AppError } from "../../error";

const ensureEmailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const data = request.body;

  const queryString: string = `
    SELECT * FROM users
    WHERE email = $1
  `;

  const queryConfig: QueryConfig = { text: queryString, values: [data.email] };

  const queryResult: IUserResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

export default ensureEmailExistsMiddleware;
