import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email().max(100),
  password: z
    .string()
    .max(120)
    .transform((pass) => {
      return hashSync(pass);
    }),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const userSchema = createUserSchema.extend({
  id: z.number(),
});

const userOmitPasswordSchema = userSchema.omit({
  password: true,
});

const updateUserSchema = userSchema
  .pick({
    name: true,
    email: true,
    password: true,
  })
  .partial();

export {
  createUserSchema,
  userSchema,
  userOmitPasswordSchema,
  updateUserSchema,
};
