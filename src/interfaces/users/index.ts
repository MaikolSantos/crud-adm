import { QueryResult } from "pg";
import { z } from "zod";
import {
  createUserSchema,
  userOmitPasswordSchema,
  userSchema,
  updateUserSchema,
} from "../../schemas/users";

type IUserRequest = z.infer<typeof createUserSchema>;

type IUser = z.infer<typeof userSchema>;

type IUserOmitPassword = z.infer<typeof userOmitPasswordSchema>;

type IUserResultComplete = QueryResult<IUser>;

type IUserResult = QueryResult<IUserOmitPassword>;

type IUserUpdateRequest = z.infer<typeof updateUserSchema>;

export {
  IUserRequest,
  IUser,
  IUserResult,
  IUserResultComplete,
  IUserOmitPassword,
  IUserUpdateRequest
};
