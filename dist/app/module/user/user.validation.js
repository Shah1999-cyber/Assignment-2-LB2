"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZUserSchema = void 0;
const zod_1 = require("zod");
const ZUserNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim(),
    lastName: zod_1.z
        .string()
        .trim(),
});
const ZUserAddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const ZUserOrdersSchema = zod_1.z.object({
    productName: zod_1.z.string().trim(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.ZUserSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().trim(),
    password: zod_1.z.string(),
    fullName: ZUserNameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: ZUserAddressSchema,
    orders: zod_1.z.array(ZUserOrdersSchema).optional(),
});
