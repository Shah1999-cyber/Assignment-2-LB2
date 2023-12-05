"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZUserSchema = void 0;
const zod_1 = require("zod");
const ZUserNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(6, { message: 'Your first name must have more then 6 character' })
        .max(20, { message: 'Your first name must have less then 20 character' })
        .trim(),
    lastName: zod_1.z
        .string()
        .min(4, { message: 'Your last name must have more then 4 character' })
        .max(20, { message: 'Your last name must have less then 20 character' })
        .trim(),
});
const ZUserAddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1).trim(),
});
const ZUserOrdersSchema = zod_1.z.object({
    productName: zod_1.z.string().trim(),
    price: zod_1.z.string(),
    quantity: zod_1.z.string(),
});
exports.ZUserSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    username: zod_1.z.string().trim(),
    password: zod_1.z.string().min(6).max(100),
    fullName: ZUserNameSchema,
    age: zod_1.z.string(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.enum(['active', 'blocked']).default('active'),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: ZUserAddressSchema,
    orders: zod_1.z.array(ZUserOrdersSchema).optional(),
});
