import { Router } from "express";
import { createLoginController } from "../../controllers/login";

const loginRoutes: Router = Router();

loginRoutes.post("", createLoginController);

export default loginRoutes;
