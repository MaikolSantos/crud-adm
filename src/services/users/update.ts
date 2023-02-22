import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  IUser,
  IUserOmitPassword,
  IUserResult,
} from "../../interfaces/users";
import { updateUserSchema, userOmitPasswordSchema } from "../../schemas/users";

const updateUserServices = async (data: IUser, id: string): Promise<IUserOmitPassword> => {
  const validateData = updateUserSchema.parse(data);
  const dataKeys = Object.keys(validateData);
  const dataValues = Object.values(validateData);

  const queryString: string = `
    UPDATE users
    SET(%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;
  `;

  const queryFormat: string = format(queryString, dataKeys, dataValues);

  const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

  const queryResult: IUserResult = await client.query(queryConfig);

  const newData = userOmitPasswordSchema.parse(queryResult.rows[0]);

  return newData;
};

export default updateUserServices;
