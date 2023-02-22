import { z } from "zod";

const createLoginSchemas = z.object({
  email: z.string(),
  password: z.string(),
});

export { createLoginSchemas };
