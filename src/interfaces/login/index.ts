import { z } from "zod";
import { createLoginSchemas } from "../../schemas/login";

type ILoginRequest = z.infer<typeof createLoginSchemas>;

export { ILoginRequest };
