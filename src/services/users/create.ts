import { hash } from "bcryptjs";
import format from "pg-format";
import { client } from "../../database";
import {
  IUserRequest,
  IUserOmitPassword,
  IUserResult,
} from "../../interfaces/users";
import { createUserSchema, userOmitPasswordSchema } from "../../schemas/users";

const createUserServices = async (
  data: IUserRequest
): Promise<IUserOmitPassword> => {
  const validateData = createUserSchema.parse(data);

  const dataKeys = Object.keys(validateData);
  const dataValues = Object.values(validateData);

  const queryString: string = `
    INSERT INTO users(%I)
    VALUES (%L)
    RETURNING *;
  `;

  const queryFormat: string = format(queryString, dataKeys, dataValues);

  const queryResult: IUserResult = await client.query(queryFormat);

  const newData = userOmitPasswordSchema.parse(queryResult.rows[0]);

  return newData;
};

export default createUserServices;
