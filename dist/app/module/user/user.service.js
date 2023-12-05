"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("../user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(String(userData.userId))) {
        throw new Error('User already Exists');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_model_1.User.isUserExists(id);
    if (!exists) {
        throw new Error('User does not exists');
    }
    const result = yield user_model_1.User.findOne({ userId: id }, { userId: 1, username: 1, fullName: 1, age: 1, email: 1 });
    return result;
});
const DeleteSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_model_1.User.isUserExists(id);
    if (!exists) {
        throw new Error('User does not exists');
    }
    const result = yield user_model_1.User.findOneAndDelete({ userId: id });
    return result;
});
const UpdateSingleUserFromDB = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(id)) {
        yield user_model_1.User.findOneAndUpdate({ userId: id }, userData);
        return userData;
    }
    else {
        throw new Error(`User userId :${id} does not exist`);
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpdateOrderOfSingleUserFromDB = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield user_model_1.User.isUserExists(id);
    if (existedUser) {
        if (existedUser.orders) {
            const updatedUser = yield user_model_1.User.updateOne({ userId: id }, { $push: { orders: orderData } });
            return updatedUser;
        }
    }
    else {
        throw new Error(`User userId :${id} does not exist`);
    }
});
const GetOrderOfSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield user_model_1.User.isUserExists(id);
    if (existedUser) {
        if (existedUser.orders) {
            const user = yield user_model_1.User.findOne({ userId: id });
            return user === null || user === void 0 ? void 0 : user.orders;
        }
    }
    else {
        throw new Error(`User userId :${id} does not exist`);
    }
});
const GetOrderTotalPriceOfSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield user_model_1.User.isUserExists(id);
    if (existedUser) {
        if (existedUser.orders) {
            const user = yield user_model_1.User.findOne({ userId: id });
            if (user === null || user === void 0 ? void 0 : user.orders) {
                return user === null || user === void 0 ? void 0 : user.orders;
            }
        }
    }
    else {
        throw new Error(`User userId :${id} does not exist`);
    }
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    UpdateSingleUserFromDB,
    DeleteSingleUserFromDB,
    UpdateOrderOfSingleUserFromDB,
    GetOrderOfSingleUserFromDB,
    GetOrderTotalPriceOfSingleUserFromDB,
};
