import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrders = {
  productName: string;
  price: string;
  quantity: string;
};

export type TUser = {
  userId: string;
  username: string;
  password: string;
  fullName: TUserName;
  age: string;
  email: string;
  isActive: 'active' | 'blocked';
  hobbies?: string[] | null;
  address: TUserAddress;
  orders?: TUserOrders[];
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUser | null>;
}
