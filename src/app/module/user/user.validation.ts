import { z } from 'zod';

const ZUserNameSchema = z.object({
  firstName: z
    .string()
    .min(6, { message: 'Your first name must have more then 6 character' })
    .max(20, { message: 'Your first name must have less then 20 character' })
    .trim(),
  lastName: z
    .string()
    .min(4, { message: 'Your last name must have more then 4 character' })
    .max(20, { message: 'Your last name must have less then 20 character' })
    .trim(),
});

const ZUserAddressSchema = z.object({
  street: z.string(),
  city: z.string().min(1),
  country: z.string().min(1).trim(),
});

const ZUserOrdersSchema = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

export const ZUserSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string().min(6).max(100),
  fullName: ZUserNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  hobbies: z.array(z.string()),
  address: ZUserAddressSchema,
  orders: z.array(ZUserOrdersSchema),
});
