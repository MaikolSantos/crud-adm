import { IUserResult } from "../../interfaces/users";
import { client } from "../../database";
import { QueryConfig } from "pg";

const retrieveUserServices = async (id: number) => {
  const queryString = `
    SELECT id, name, email, admin, active
    FROM users
    WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default retrieveUserServices;
