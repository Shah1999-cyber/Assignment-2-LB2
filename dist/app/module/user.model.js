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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const UserNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        minLength: [4, 'First Name cannot be less then 8 character'],
        maxlength: [20, 'First Name cannot be more then 20 character'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
        minLength: [4, 'Last Name cannot be less then 8 character'],
        maxlength: [20, 'Last Name cannot be more then 20 character'],
    },
});
const UserAddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
    },
    city: {
        type: String,
        required: [true, 'Please give a valid city'],
    },
    country: {
        type: String,
        required: [true, 'Please give a valid country'],
    },
});
const UserOrdersSchema = new mongoose_1.Schema({
    productName: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
});
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: [100, 'Password must be less then 40 character'],
        minlength: [6, 'password must be at least 6 characters'],
        isSecure: true,
    },
    fullName: {
        type: UserNameSchema,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    hobbies: {
        type: [String],
    },
    address: {
        type: UserAddressSchema,
        required: true,
    },
    orders: {
        type: [UserOrdersSchema],
        required: false,
    },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
UserSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
UserSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
UserSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
UserSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
