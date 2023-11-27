import { User } from '../user.model'
import { TUser } from './user.interface'

const createUserIntoDB = async (userData: TUser) => {
   if(await User.isUserExists(String(userData.userId))){
        throw new Error('User already Exists')
   }
  const result = await User.create(userData)
  return result;
}

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getSingleUserFromDB = async (id: string) => {
  const userIdNumber = parseFloat(id)
  const exists = await User.isUserExists(String(id));
  if(!exists){
    throw new Error('User does not exists');
  }
  const result = await User.aggregate([{ $match: { userId: userIdNumber } }])
  return result
}
const DeleteSingleUserFromDB = async (id: string) => {
  const userIdNumber = parseFloat(id)
  const result = await User.findOneAndDelete({ userId: userIdNumber});
  return result
}

const UpdateSingleUserFromDB = async (id: string, userData: TUser) => {
  if (await User.isUserExists(id)) {
    await User.findOneAndUpdate({userId : id}, userData)
    return userData
  }else{
      throw new Error( `User userId :${id} does not exist`)
  }
}

const UpdateOrderOfSingleUserFromDB = async (id: string, orderData: any) => {
  const existedUser = await User.isUserExists(id);
  if (existedUser) {
    if(existedUser.orders){
        const updatedUser = await User.updateOne({userId : id}, {$push : { orders : orderData}})
         return updatedUser
    } 
  }else{
      throw new Error( `User userId :${id} does not exist`)
  }
}
const GetOrderOfSingleUserFromDB = async (id: string, orderData: any) => {
  const existedUser = await User.isUserExists(id);
  if (existedUser) {
    if(existedUser.orders){
        const user = await User.findOne({userId : id})
         return user?.orders
    } 
  }else{
      throw new Error( `User userId :${id} does not exist`)
  }
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  UpdateSingleUserFromDB,
  DeleteSingleUserFromDB,
  UpdateOrderOfSingleUserFromDB,
  GetOrderOfSingleUserFromDB,
}
