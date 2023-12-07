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
  city: z.string().min(1),
  country: z.string().min(1).trim(),
});

const ZUserOrdersSchema = z.object({
  productName: z.string().trim(),
  price: z.string(),
  quantity: z.string(),
});

export const ZUserSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string().min(6).max(100),
  fullName: ZUserNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: ZUserAddressSchema,
  orders: z.array(ZUserOrdersSchema).optional(),
});
