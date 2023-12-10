import { z } from 'zod';

const ZUserNameSchema = z.object({
  firstName: z
    .string()
    .trim(),
  lastName: z
    .string()
    .trim(),
});

const ZUserAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const ZUserOrdersSchema = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

export const ZUserSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string(),
  fullName: ZUserNameSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: ZUserAddressSchema,
  orders: z.array(ZUserOrdersSchema).optional(),
});
