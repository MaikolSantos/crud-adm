import { IUserResult } from "../../interfaces/users";
import { client } from "../../database";

const readUserServices = async () => {
  const queryString = `
    SELECT id, name, email, admin, active
    FROM users;
  `;

  const queryResult: IUserResult = await client.query(queryString);

  return queryResult.rows
};

export default readUserServices;
