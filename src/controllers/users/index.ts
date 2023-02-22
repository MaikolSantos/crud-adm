import { Request, Response } from "express";
import {
  createUserServices,
  updateUserServices,
  readUserServices,
  retrieveUserServices,
  deleteUserServices,
  activeUserServices,
} from "../../services/users";

const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data = request.body;

  const user = await createUserServices(data);

  return response.status(201).json(user);
};

const readUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const list = await readUserServices();

  return response.status(200).json(list);
};

const retriveUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = request.user.id;

  const user = await retrieveUserServices(id);

  return response.status(200).json(user);
};

const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data = request.body;

  const id = request.params.id;

  const user = await updateUserServices(data, id);

  return response.status(200).json(user);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = Number(request.params.id);

  await deleteUserServices(id);

  return response.status(204).send();
};

const activeUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = Number(request.params.id);

  const user = await activeUserServices(id);

  return response.status(200).json(user);
};

export {
  createUserController,
  readUserController,
  retriveUserController,
  updateUserController,
  deleteUserController,
  activeUserController
};
