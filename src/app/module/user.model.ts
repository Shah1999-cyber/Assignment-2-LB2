import { Schema, model } from 'mongoose';
import {
  TUserAddress,
  TUserName,
  TUserOrders,
  TUser,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const UserNameSchema = new Schema<TUserName>({
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

const UserAddressSchema = new Schema<TUserAddress>({
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

const UserOrdersSchema = new Schema<TUserOrders>({
  productName: {
    type: String,
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
});

const UserSchema = new Schema<TUser, UserModel>({
  userId: {
    type: String,
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
    minlength: [6, 'password must be at least 6 characters'],
    isSecure: true,
  },
  fullName: {
    type: UserNameSchema,
    required: true,
  },
  age: {
    type: String,
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
    optional: true,
  },
});

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
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

UserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', UserSchema);
