import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(String(userData.userId))) {
    throw new Error('User already Exists');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({},{username: 1, fullName: 1, age : 1, email: 1, address: 1});
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const exists = await User.isUserExists(id);
  if (!exists) {
    throw new Error('User does not exists');
  }
  const result = await User.findOne({userId: id},{userId : 1, username : 1, fullName: 1, age : 1, email : 1});
  return result;
};
const DeleteSingleUserFromDB = async (id: string) => {
  const exists = await User.isUserExists(id);
  if (!exists) {
    throw new Error('User does not exists');
  }
  const result = await User.findOneAndDelete({ userId: id });
  return result;
};

const UpdateSingleUserFromDB = async (id: string, userData: TUser) => {
  if (await User.isUserExists(id)) {
    await User.findOneAndUpdate({ userId: id }, userData);
    return userData;
  } else {
    throw new Error(`User userId :${id} does not exist`);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpdateOrderOfSingleUserFromDB = async (id: string, orderData: any) => {
  const existedUser = await User.isUserExists(id);
  if (existedUser) {
    if (existedUser.orders) {
      const updatedUser = await User.updateOne(
        { userId: id },
        { $push: { orders: orderData } },
      );
      return updatedUser;
    }
  } else {
    throw new Error(`User userId :${id} does not exist`);
  }
};
const GetOrderOfSingleUserFromDB = async (id: string) => {
  const existedUser = await User.isUserExists(id);
  if (existedUser) {
    if (existedUser.orders) {
      const user = await User.findOne({ userId: id });
      return user?.orders;
    }
  } else {
    throw new Error(`User userId :${id} does not exist`);
  }
};

const GetOrderTotalPriceOfSingleUserFromDB = async (id: string) => {
  const existedUser = await User.isUserExists(id);
  if (existedUser) {
    if (existedUser.orders) {
      const user = await User.findOne({ userId: id });
      if (user?.orders) {
        return user?.orders;
      }
    }
  } else {
    throw new Error(`User userId :${id} does not exist`);
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  UpdateSingleUserFromDB,
  DeleteSingleUserFromDB,
  UpdateOrderOfSingleUserFromDB,
  GetOrderOfSingleUserFromDB,
  GetOrderTotalPriceOfSingleUserFromDB,
};
