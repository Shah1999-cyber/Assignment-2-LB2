import { UsersModel } from '../user.model'
import { TUser } from './user.interface'

const createUserIntoDB = async (userData: TUser) => {
  const result = await UsersModel.create(userData)
  return result
}

const getAllUsersFromDB = async () => {
  const result = await UsersModel.find()
  return result
}

const getSingleUserFromDB = async (id: string) => {
  const result = await UsersModel.findById(id)
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
}
