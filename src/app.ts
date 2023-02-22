import express, { Application, json } from "express";
import { errorHandler } from "./error";
import "express-async-errors";
import userRoutes from "./routers/users";
import loginRoutes from "./routers/login";

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(errorHandler);

export default app;
