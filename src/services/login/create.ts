import { QueryConfig } from "pg";
import { ILoginRequest } from "../../interfaces/login";
import { IUserResultComplete } from "../../interfaces/users";
import { client } from "../../database";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createLoginSchemas } from "../../schemas/login";

const createLoginService = async (data: ILoginRequest): Promise<string> => {
  data = createLoginSchemas.parse(data);

  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [data.email],
  };

  const queryResult: IUserResultComplete = await client.query(queryConfig);

  if (queryResult.rowCount == 0) {
    throw new AppError("Wrong e-mail or password", 401);
  }

  const comparePassword = await compare(
    data.password,
    queryResult.rows[0].password
  );

  if (!comparePassword) {
    throw new AppError("Wrong e-mail or password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: queryResult.rows[0].admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default createLoginService;
