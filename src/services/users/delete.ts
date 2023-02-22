import { client } from "../../database";
import { QueryConfig } from "pg";

const deleteUserServices = async (id: number) => {
  const queryString = `
    UPDATE users
    SET active = false
    WHERE id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);
};

export default deleteUserServices;
