import { Router } from "express";
import {
  createUserController,
  readUserController,
  retriveUserController,
  updateUserController,
  deleteUserController,
  activeUserController,
} from "../../controllers/users";
import {
  ensureEmailExistsMiddleware,
  ensureIsAdminMiddleware,
  ensureUpdateUserMiddleware,
  ensureUserExistsMiddleware,
} from "../../middlewares/users";
import { verifyTokenIsValidMiddleware } from "../../middlewares/login";

const usersRoutes: Router = Router();

usersRoutes.post("", ensureEmailExistsMiddleware, createUserController);

usersRoutes.get(
  "",
  verifyTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  readUserController
);

usersRoutes.get(
  "/profile",
  verifyTokenIsValidMiddleware,
  retriveUserController
);

usersRoutes.patch(
  "/:id",
  verifyTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUpdateUserMiddleware,
  ensureEmailExistsMiddleware,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  verifyTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureUpdateUserMiddleware,
  deleteUserController
);

usersRoutes.put(
  "/:id/recover",
  verifyTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureIsAdminMiddleware,
  activeUserController
);

export default usersRoutes;
