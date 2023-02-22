import { IUserResult } from "../../interfaces/users";
import { client } from "../../database";
import { QueryConfig } from "pg";
import { AppError } from "../../error";

const activeUserServices = async (id: number) => {
  let queryString = `
    SELECT id, name, email, admin, active
    FROM users
    WHERE id = $1;
  `;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  let queryResult: IUserResult = await client.query(queryConfig);

  if (queryResult.rows[0].active) {
    throw new AppError("User already active.", 400);
  }

  queryString = `
    UPDATE users
    SET active = true
    WHERE id = $1
    RETURNING id, name, email, admin, active;
  `;

  queryConfig = {
    text: queryString,
    values: [id],
  };

  queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default activeUserServices;
